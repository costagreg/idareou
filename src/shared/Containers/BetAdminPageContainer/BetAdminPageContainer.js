import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { findBet } from '~src/shared/graphql/queries'
import BetCard from '~src/shared/Components/BetCard'

import Proptypes from 'prop-types'

export class BetAdminPageContainer extends Component {
  render() {
    const { data: { findBet: bet } } = this.props

    if (!bet) {
      return null
    }

    return <BetCard { ...bet } />
  }
}

BetAdminPageContainer.propTypes = {
  betId: Proptypes.string.isRequired
}

export default graphql(findBet, { options: ({ betId }) => ({ variables: { id: betId } }) })(BetAdminPageContainer)
