import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { findBet } from '~src/shared/graphql/queries'
import JoinBetCard from '~src/shared/Components/JoinBetCard'
export class JoinBetContainer extends Component {
  state = {
    bet: {}
  }

  componentDidMount() {
    this.props.client.query({
      query: findBet,
      variables: {
        id: this.props.betId
      }
    }).then(({ data: { findBet } }) => {
      if (findBet) {
        this.setState({ bet: findBet })
      }
    })
  }

  render() {
    return <JoinBetCard {...this.state.bet}></JoinBetCard>
  }
}

JoinBetContainer.propTypes = {
  betId: Proptypes.string
}

export default withApollo(JoinBetContainer)
