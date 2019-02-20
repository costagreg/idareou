import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '~src/shared/Components/Header'
import Consumer from '../ContextContainer'
import routes from '~src/shared/AppRouter/routes'

export class HeaderContainer extends Component {
  state = {
    showSidebar: false
  }

  static displayName = 'HeaderContainer'

  setShowSidebar = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  getLinkMarkUp(links) {
    const { currentUser } = this.props
    return links.map(({ path, name, exact = false, auth }) =>
      ((currentUser && auth) || (!currentUser && !auth) || (typeof auth === 'undefined')) && <NavLink
        key={name}
        exact={exact}
        to={path}
        onClick={this.setShowSidebar}
        >
        {name}
      </NavLink>)
  }

  render() {
    return (
      <Header
        context={this.props.context}
        linskMarkUp={this.getLinkMarkUp(routes)}
        setShowSidebar={this.setShowSidebar}
        showSidebar={this.state.showSidebar}
      />
    )
  }
}

HeaderContainer.propTypes = {
  context: PropTypes.object
}

export default props =>
  <Consumer>
     { context => <HeaderContainer {...props} context={context} /> }
  </Consumer>
