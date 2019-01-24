import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import AppRouter from './shared/AppRouter'
import configureStore from './shared/redux/configureStore'
import { ContextContainer } from './shared/Containers/ContextContainer'
// import UserList from './shared/Components/UserList'

const { store, isDesktop } = window.__PRELOAD__STATE
// const { store } = window.__PRELOAD__STATE

const preloadState = configureStore(store)
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
})

const render = (Component) => {
  hydrate(
    <AppContainer>
      <Provider store={preloadState}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <ContextContainer isDesktop={isDesktop}>
              <Component />
            </ContextContainer>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
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
