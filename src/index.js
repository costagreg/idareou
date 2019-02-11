import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import AppRouter from './shared/AppRouter'
import { ContextContainer } from './shared/Containers/ContextContainer'

const { store, isDesktop } = window.__APOLLO_STATE__

const client = new ApolloClient({
  cache: new InMemoryCache().restore(store),
  link: new HttpLink({
    credentials: 'include',
    uri: process.env.GRAPHQL_URL
  })
})

const render = (Component) => {
  hydrate(
    <AppContainer>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ContextContainer isDesktop={isDesktop}>
            <Component />
          </ContextContainer>
        </BrowserRouter>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(AppRouter)

// Enable HMR
if (module.hot) {
  module.hot.accept('./shared/AppRouter', () => {
    const AppRouter = require('./shared/AppRouter').default
    render(AppRouter)
  })
}
