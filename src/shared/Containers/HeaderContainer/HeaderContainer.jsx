import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '~src/shared/Components/Header'
import Consumer from '../ContextContainer'
import routes from '~src/shared/AppRouter/routes'

export class HeaderContainer extends Component {
  state = {
    showSideBar: false
  }

  static displayName = 'HeaderContainer'

  setShowSideBar = () => {
    this.setState({
      showSideBar: !this.state.showSideBar
    })
  }

  getLinkMarkUp(links) {
    return links.map(({ path, name, exact = false }) =>
      <NavLink
        key={name}
        exact={exact}
        to={path}
        onClick={this.setShowSideBar}
        >
        {name}
      </NavLink>)
  }

  render() {
    return (
      <Header
        context={this.props.context}
        linskMarkUp={this.getLinkMarkUp(routes)}
        setShowSideBar={this.setShowSideBar}
        showSideBar={this.state.showSideBar}
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
