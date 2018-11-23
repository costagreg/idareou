import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import AppRouter from './shared/AppRouter'
import configureStore from './shared/redux/configureStore'
import { ContextContainer } from './shared/Containers/ContextContainer'

const { store, isDesktop } = window.__PRELOAD__STATE

const preloadState = configureStore(store)

const render = Component => {
  hydrate(
    <AppContainer>
      <Provider store={preloadState}>
        <BrowserRouter>
          <ContextContainer isDesktop={isDesktop}>
            <Component />
          </ContextContainer>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(AppRouter)

// Enable HMR
if(module.hot) {
  module.hot.accept('./shared/AppRouter', () => {
    const AppRouter = require('./shared/AppRouter').default;
    render(AppRouter)
  })
}
