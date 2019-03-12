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
  filterAuthRoutes = (currentUser, auth, route) =>
    (currentUser || (!currentUser && !auth) || (typeof auth === 'undefined')) && route

  renderRoutes = (currentUser) =>
    routes.map(({ Component, path, auth }, index) =>
      this.filterAuthRoutes(currentUser, auth, <Route
        key={index}
        exact
        path={path}
        render={props => (!auth && currentUser) && (path !== '/')
          ? <Redirect to='/' />
          : <Component {...props} />
        }
      />))

  redirectIfExist = () =>
    routes.find(({ path }) => this.props.location.pathname === path)

  shouldComponentUpdate(nextProps) {
    // Avoid re-render on graphql query the currentUser before push the to history
    return !(this.props.location.pathname === nextProps.location.pathname && (this.props.location.state || {}.from))
  }

  render() {
    const { data: { currentUser }, location } = this.props

    return (
      <Fragment>
        <div className='approuter'>
          <HeaderContainer currentUser={currentUser} />
          <Switch>
            { this.renderRoutes(currentUser) }
            { <Redirect to={{
                pathname: '/login',
                state: { from: this.redirectIfExist() && location.pathname }
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
