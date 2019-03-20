import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'

import AppRouter from '~src/shared/AppRouter'
import { ContextContainer } from '~src/shared/Containers/ContextContainer'

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
      fetch,
      uri: process.env.GRAPHQL_URL,
      headers: {
        cookie: req.header('Cookie')
      }
    })
  })

  const App = <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={{}}>
        <ContextContainer isDesktop={isDesktop}>
          <AppRouter />
        </ContextContainer>
      </StaticRouter>
    </ApolloProvider>

  await getDataFromTree(App)

  const preloadState = { store: client.extract(), isDesktop }

  return { content: renderToString(App), preloadState }
}
