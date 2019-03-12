import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import HistoryPage from '~src/shared/Pages/HistoryPage'
import { currentBets } from '~src/shared/graphql/queries'

export class HistoryPageContainer extends Component {
  render() {
    const bets = this.props.data.currentBets

    return (
      <HistoryPage bets={bets}/>
    )
  }
}

HistoryPageContainer.propTypes = {
  bets: PropTypes.array,
  fetchToStore: PropTypes.func
}

export default graphql(currentBets)(HistoryPageContainer)
