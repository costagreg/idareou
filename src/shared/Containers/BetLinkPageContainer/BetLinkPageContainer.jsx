import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import { betAdded } from '~src/shared/graphql/queries'

import BetLinkPage from '~src/shared/Pages/BetLinkPage'

class BetLinkPageContainer extends Component {
  state = {}

  getBetId = async () => {
    const { client } = this.props
    const { data } = await client.query({
      query: betAdded
    })

    this.setState({
      betId: data.betAdded
    })
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
