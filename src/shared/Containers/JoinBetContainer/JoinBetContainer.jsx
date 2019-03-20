import React, { Component, Fragment } from 'react'
import Proptypes from 'prop-types'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import JoinBetCard from '~src/shared/Components/JoinBetCard'
import { findBet } from '~src/shared/graphql/queries'
import { updateBetParticipant } from '~src/shared/graphql/mutations/betMutation'
import { FormContainer } from '~src/shared/Containers/FormContainer'
import { RadioBox } from '~src/shared/Components/Common/RadioBox'
import { Button } from '~src/shared/Components/Common/Button'

export class JoinBetContainer extends Component {

  state = {}

  fetchBet = async (betId) => {
    const { client, history } = this.props

    const findBetQuery = await client.query({
      query: findBet,
      variables: {
        id: betId
      }
    })

    const { data } = findBetQuery

    if (data && data.findBet) {
      this.setState({ bet: data.findBet })
    } else {
      history.push('/')
    }
  }

  async componentDidMount() {
    const { betId, history } = this.props

    try {
      await this.fetchBet(betId)
    } catch {
      history.push('/')
    }
  }

  submitData = (formData) => {
    const { client } = this.props

    client.mutate({
      mutation: updateBetParticipant,
      variables: {
        betId: this.props.betId,
        optionId: formData.optionId
      }
    })
  }

  render() {
    const { bet } = this.state

    if(!bet) {
      return null
    }

    return <Fragment>
      <JoinBetCard {...bet}></JoinBetCard>
      <FormContainer onSubmit={this.submitData}>
        <h4>Choose your option</h4>
        {bet.options && bet.options.map(({ _id, title }) => <RadioBox key={_id} name={`optionId`} text={title} optionValue={_id} />)}
        <Button>Join Bet</Button>
      </FormContainer>
    </Fragment>
  }
}

JoinBetContainer.propTypes = {
  betId: Proptypes.string
}

export default withRouter(withApollo(JoinBetContainer))
