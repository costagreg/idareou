import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Accodion from '~src/shared/Components/Accordion'
import HistoryBetCard from '~src/shared/Components/HistoryBetCard'
import { currentBets } from '~src/shared/graphql/queries'

export class HistoryPageContainer extends Component {
  render() {
    const { currentBets } = this.props.data

    return (
      <Accodion sections={currentBets}>
        <HistoryBetCard />
      </Accodion>
    )
  }
}

HistoryPageContainer.propTypes = {
  currentBets: PropTypes.array
}

export default graphql(currentBets)(HistoryPageContainer)
