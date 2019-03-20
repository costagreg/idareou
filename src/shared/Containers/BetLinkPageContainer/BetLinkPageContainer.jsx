import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import Proptypes from 'prop-types'

import { betAdded } from '~src/shared/graphql/queries'

import BetLinkPage from '~src/shared/Pages/BetLinkPage'

export class BetLinkPageContainer extends Component {
  state = {}

  getBetId = async () => {
    const { client, history } = this.props

    try {
      const bet = await client.query({
        query: betAdded
      })
      this.setState({
        betId: bet.data.betAdded
      })
    } catch(e) {
      history.push('/')
    }
  }

  componentDidMount() {
    this.getBetId()
  }

  render() {
    return(
      <div className="BetLinkPage">
        <BetLinkPage betId={this.state.betId}/>
      </div>
    )
  }
}

BetLinkPageContainer.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}

export default withRouter(withApollo(BetLinkPageContainer))
