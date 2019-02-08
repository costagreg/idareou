import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { currentUser } from '~src/shared/graphql/queries'
import HeaderContainer from '~src/shared/Containers/HeaderContainer'
import routes from './routes'

if (process.browser) {
  require('styles/global.scss')
}

class AppRouter extends Component {
  filterRoute = (currentUser, auth, route) =>
    ((currentUser && auth) || (!currentUser && !auth) || (typeof auth === 'undefined')) && route

  renderRoutes = (currentUser) =>
    routes.map(({ Component, path, auth }, index) =>
      this.filterRoute(currentUser, auth, <Route
        key={index}
        exact
        path={path}
        component={Component}
      />))

  render() {
    const { data: { currentUser } } = this.props
    return (
      <Fragment>
        <div className='approuter'>
          <HeaderContainer currentUser={currentUser} />
          <Switch>
            {this.renderRoutes(currentUser)}
            <Redirect to="/" />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default graphql(currentUser)(AppRouter)
