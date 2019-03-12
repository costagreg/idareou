import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import { currentBets } from '~src/shared/graphql/queries'

import BetLinkPage from '~src/shared/Pages/BetLinkPage'

class BetLinkPageContainer extends Component {
  componentDidMount() {
    const { client } = this.props
    try {
      const data = client.readQuery({ query: currentBets })
      console.log(data)
    } catch(e) {
      console.log(client)
    }

  }
  render() {
    console.log(this.props.location)
    return(
      <div className="BetLinkPage">
        <BetLinkPage />
      </div>
    )
  }
}

export default withRouter(withApollo(BetLinkPageContainer))
