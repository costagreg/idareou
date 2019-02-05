import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import configureStore from '~src/shared/redux/configureStore'
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

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL
})

const getDevice = userAgent => {
  const rgxMobile = new RegExp('Mobile')

  return !rgxMobile.test(userAgent)
}

export default async req => {
  const isDesktop = req.headers['user-agent'] && getDevice(req.headers['user-agent'])

  const store = configureStore({}, req)
  const promises = getNeedsByMatchedUrl(store, req.url)

  await Promise.all(promises)

  const content = renderToString(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={{}}>
          <ContextContainer isDesktop={isDesktop}>
            <AppRouter />
          </ContextContainer>
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  )
  const preloadState = { store: store.getState(), isDesktop }

  return { content, preloadState }
}
