import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Accodion from '~src/shared/Components/Accordion'
import HistoryBetCard from '~src/shared/Components/HistoryBetCard'
import compose from '~src/shared/helpers/compose'
import { currentBets, currentUser } from '~src/shared/graphql/queries'

export class HistoryPageContainer extends Component {
  render() {
    const { queryCurrentBets: { currentBets }, queryCurrentUser: { currentUser } } = this.props

    return (
      <Accodion sections={currentBets} currentUser={currentUser._id}>
        <HistoryBetCard />
      </Accodion>
    )
  }
}

HistoryPageContainer.propTypes = {
  data: PropTypes.object
}

export default compose(
  graphql(currentBets, { name: 'queryCurrentBets' }),
  graphql(currentUser, { name: 'queryCurrentUser' }),
)(HistoryPageContainer)
