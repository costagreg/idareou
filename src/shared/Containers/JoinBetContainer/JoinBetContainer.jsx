import React, { Component, Fragment } from 'react'
import Proptypes from 'prop-types'
import { withApollo, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import BetCard from '~src/shared/Components/BetCard'
import { findBet } from '~src/shared/graphql/queries'
import { updateBetParticipant } from '~src/shared/graphql/mutations/betMutation'
import { FormContainer } from '~src/shared/Containers/FormContainer'
import { RadioBox } from '~src/shared/Components/Common/RadioBox'
import { Button } from '~src/shared/Components/Common/Button'
import compose from '~src/shared/helpers/compose'

export class JoinBetContainer extends Component {
  componentDidMount() {
    const { data: { findBet: bet } } = this.props

    if (!bet) {
      this.redirectToHomePage()
    }
  }

  redirectToHomePage = () => {
    const { history } = this.props

    history.push('/')
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
    const { data: { findBet: bet } } = this.props

    if (!bet) {
      return null
    }

    return <Fragment>
      <BetCard {...bet} />
      <FormContainer onSubmit={this.submitData}>
        <h4>Choose your option</h4>
        {bet.options && bet.options.map(({ _id, title }) => <RadioBox key={_id} name={`optionId`} text={title} optionValue={_id} />)}
        <Button>Join Bet</Button>
      </FormContainer>
    </Fragment>
  }
}

JoinBetContainer.propTypes = {
  betId: Proptypes.string,
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}

export default compose(
  withRouter,
  withApollo,
  graphql(findBet, { options: ({ betId }) => ({ variables: { id: betId } }) }),
)(JoinBetContainer)
