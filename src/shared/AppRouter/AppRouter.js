import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { currentUser } from '~src/shared/graphql/queries'
import HeaderContainer from '~src/shared/Containers/HeaderContainer'
import routes from './routes'

if (process.browser) {
  require('styles/global.scss')
}

class AppRouter extends Component {
  filterRoute = (currentUser, auth, route) =>
    (currentUser || (!currentUser && !auth) || (typeof auth === 'undefined')) && route

  renderRoutes = (currentUser) =>
    routes.map(({ Component, path, auth }, index) =>
      this.filterRoute(currentUser, auth, <Route
        key={index}
        exact
        path={path}
        component={Component}
      />))

  shouldRedirectBack = () =>
    routes.find(({ path, redirect }) => this.props.location.pathname === path && redirect)

  render() {
    const { data: { currentUser }, location } = this.props
    console.log(this.props.location)
    return (
      <Fragment>
        <div className='approuter'>
          <HeaderContainer currentUser={currentUser} />
          <Switch>
            { this.renderRoutes(currentUser) }
            { <Redirect to={{
                pathname: '/login',
                state: { from: this.shouldRedirectBack() && location.pathname }
                }}
              />
            }
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(graphql(currentUser)(AppRouter))
