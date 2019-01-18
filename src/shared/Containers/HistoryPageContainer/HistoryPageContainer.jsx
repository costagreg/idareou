import React, { Component } from 'react'
import { connect } from 'react-redux'

import HistoryPage from '~src/shared/Pages/HistoryPage'

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
