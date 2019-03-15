import React, { Component } from 'react'
import Proptypes from 'prop-types'

export default class JoinBetContainer extends Component {
  render() {
    return <div>Yeah sajdjsd {this.props.betId} </div>
  }
}

JoinBetContainer.propTypes = {
  betId: Proptypes.string
}
