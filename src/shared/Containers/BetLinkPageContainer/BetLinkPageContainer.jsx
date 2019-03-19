import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo, graphql } from 'react-apollo'

import { betAdded } from '~src/shared/graphql/queries'

import BetLinkPage from '~src/shared/Pages/BetLinkPage'

class BetLinkPageContainer extends Component {
  state = {}

  getBetId = async () => {
    const { client } = this.props
    try {
      const { data } = await client.query({
        query: betAdded
      })
      this.setState({
        betId: data.betAdded
      })
    } catch(e) {
      console.log(e)
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

export default withRouter(withApollo(BetLinkPageContainer))
