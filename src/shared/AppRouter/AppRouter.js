import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import HeaderContainer from '~src/shared/Containers/HeaderContainer'
import routes from './routes'

import UserList from '../Components/UserList'
if (process.browser) {
  require('styles/global.scss')
}

const AppRouter = () => {
  return (
    <Fragment>
      <div className='approuter'>
        <HeaderContainer />
        <UserList />
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
