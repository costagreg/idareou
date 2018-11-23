import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from '../../../../shared/redux/configureStore'

import AppRouter from '../../../../shared/AppRouter'
import routes from '../../../../shared/AppRouter/routes'
import { ContextContainer } from '../../../../shared/Containers/ContextContainer'

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

  const store = configureStore({}, req)
  const promises = getNeedsByMatchedUrl(store, req.url)

  await Promise.all(promises)

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <ContextContainer isDesktop={isDesktop}>
          <AppRouter />
        </ContextContainer>
      </StaticRouter>
    </Provider>
  )
  const preloadState = { store: store.getState(), isDesktop }

  return { content, preloadState }
}