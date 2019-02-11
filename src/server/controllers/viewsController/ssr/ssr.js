import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

import { configureStore } from '~src/shared/redux/configureStore'
import AppRouter from '~src/shared/AppRouter'
import routes from '~src/shared/AppRouter/routes'
import { ContextContainer } from '~src/shared/Containers/ContextContainer'
// import UserList from '../../../../shared/Components/UserList'

const getNeedsByMatchedUrl = (store, url) => (
  routes.reduce((matches, route) => {
    const match = matchPath(url, route)

    if (match && route.Component.fetchData) {
      matches.push(route.Component.fetchData(store))
    }

    return matches
  }, [])
)

const getDevice = userAgent => {
  const rgxMobile = new RegExp('Mobile')

  return !rgxMobile.test(userAgent)
}

export default async req => {
  const isDesktop = req.headers['user-agent'] && getDevice(req.headers['user-agent'])
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'include',
      uri: process.env.GRAPHQL_URL,
      headers: {
        cookie: req.header('Cookie')
      }
    })
  })

  const store = configureStore({}, req)

  const promises = getNeedsByMatchedUrl(store, req.url)

  await Promise.all(promises)

  const App = <Provider store={store}>
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={{}}>
        <ContextContainer isDesktop={isDesktop}>
          <AppRouter />
        </ContextContainer>
      </StaticRouter>
    </ApolloProvider>
  </Provider>

  await getDataFromTree(App)
  const content = renderToString(App)

  const preloadState = { store: client.extract(), isDesktop }

  return { content, preloadState }
}
