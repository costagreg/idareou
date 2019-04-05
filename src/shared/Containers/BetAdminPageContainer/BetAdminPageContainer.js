import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import Proptypes from 'prop-types'

import BetCard from '~src/shared/Components/BetCard'
import { findBet } from '~src/shared/graphql/queries'
import { FormContainer } from '~src/shared/Containers/FormContainer'
import { RadioBox } from '~src/shared/Components/Common/RadioBox'
import { Button } from '~src/shared/Components/Common/Button'

export class BetAdminPageContainer extends Component {
  render() {
    const { data: { findBet: bet } } = this.props

    if (!bet) {
      return null
    }

    return <Fragment>
    <BetCard { ...bet } />
      <FormContainer onSubmit={this.submitData}>
        <h4>Choose the winning option</h4>
        {bet.options && bet.options.map(({ _id, title }) => <RadioBox key={_id} name={`optionId`} text={title} optionValue={_id} />)}
        <Button>Send</Button>
      </FormContainer>
    </Fragment>
  }
}

BetAdminPageContainer.propTypes = {
  betId: Proptypes.string.isRequired
}

export default graphql(findBet, { options: ({ betId }) => ({ variables: { id: betId } }) })(BetAdminPageContainer)
