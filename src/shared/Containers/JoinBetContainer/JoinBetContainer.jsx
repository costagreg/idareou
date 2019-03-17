import React, { Component, Fragment } from 'react'
import Proptypes from 'prop-types'
import { withApollo } from 'react-apollo'

import JoinBetCard from '~src/shared/Components/JoinBetCard'
import { findBet } from '~src/shared/graphql/queries'
import { FormContainer } from '~src/shared/Containers/FormContainer'
import { CheckBox } from '~src/shared/Components/Common/CheckBox'
import { Button } from '~src/shared/Components/Common/Button'

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
    const { bet } = this.state

    return <Fragment>
      <JoinBetCard {...bet}></JoinBetCard>
      <FormContainer onSubmit={(formData) => {console.log(formData)}}>
        <h4>Choose your option</h4>
        {bet.options && bet.options.map(({ _id, title }) => <CheckBox key={_id} name='options' text={title} value={_id} />)}
        <Button>Join Bet</Button>
      </FormContainer>
    </Fragment>
  }
}

JoinBetContainer.propTypes = {
  betId: Proptypes.string
}

export default withApollo(JoinBetContainer)
