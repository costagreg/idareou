import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from './routes'

if(process.browser) {
  require('../../styles/global.scss')
}

const AppRouter = () => {
  return (
    <Fragment>
      <div className='container'>
      <i class="fa fa-address-book"></i>
        <Switch>
            {
              routes.map(({ Component, path }, index) =>
                <Route
                  key={index}
                  exact
                  path={path}
                  component={Component}
                />)
            }
        </Switch>
      </div>
    </Fragment>
  )
}

export default AppRouter