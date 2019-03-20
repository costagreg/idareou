import React, { Component, Fragment } from 'react'
import Proptypes from 'prop-types'
import { withApollo } from 'react-apollo'

import JoinBetCard from '~src/shared/Components/JoinBetCard'
import { findBet } from '~src/shared/graphql/queries'
import { updateBetParticipant } from '~src/shared/graphql/mutations/betMutation'
import { FormContainer } from '~src/shared/Containers/FormContainer'
import { RadioBox } from '~src/shared/Components/Common/RadioBox'
import { Button } from '~src/shared/Components/Common/Button'

export class JoinBetContainer extends Component {
  state = {
    bet: {}
  }

  async componentDidMount() {
    const findBetQuery = await this.props.client.query({
      query: findBet,
      variables: {
        id: this.props.betId
      }
    })
    const { data } = findBetQuery
    if (data && data.findBet) {
      this.setState({ bet: data.findBet })
    }
  }

  submitData = (formData) => {
    this.props.client.mutate({
      mutation: updateBetParticipant,
      variables: {
        betId: this.props.betId,
        optionId: formData.optionId
      }
    })
  }

  render() {
    const { bet } = this.state

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

export default withApollo(JoinBetContainer)
