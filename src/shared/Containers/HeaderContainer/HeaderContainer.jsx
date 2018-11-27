import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import Consumer from '../ContextContainer'
import Header from '../../Components/Header'

import routes from '../../AppRouter/routes'

export class HeaderContainer extends Component {
  state = {
    showSideBar: false,
  }

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
      </NavLink>
    )
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

export default props =>
  <Consumer>
     { context => <HeaderContainer {...props} context={context} /> }
  </Consumer>