import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { findBet } from '~src/shared/graphql/queries'
import BetAdminCard from '~src/shared/Components/BetAdminCard/BetAdminCard'

import Proptypes from 'prop-types'

export class BetAdminPageContainer extends Component {
  render() {
    const { data: { findBet: bet } } = this.props

    return <Fragment>
      <BetAdminCard { ...bet } />
    </Fragment>
  }
}

BetAdminPageContainer.propTypes = {
  betId: Proptypes.string.isRequired
}

export default graphql(findBet, { options: ({ betId }) => ({ variables: { id: betId } }) })(BetAdminPageContainer)
