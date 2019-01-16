import React, { Component } from 'react'
import { connect } from 'react-redux'

import HistoryPage from '~Pages/HistoryPage'

export class HistoryPageContainer extends Component {
  render() {
    return <HistoryPage/>
  }
}

export default connect(
  state => ({
    bets: state.bets
  }),
  undefined
)(HistoryPageContainer)
