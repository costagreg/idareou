import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import { addBet } from '~src/shared/graphql/mutations/betMutation'

import { TextInput } from '~src/shared/Components/Common/TextInput'
import { TextArea } from '~src/shared/Components/Common/TextArea'
import { AmountInput } from '~src/shared/Components/Common/AmountInput'
import { TextCheckBox } from '~src/shared/Components/Common/TextCheckBox'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

// {
//   title: 'frontEndTitle',
//   description: 'description',
//   amount: 10.00,
//   currency: '£',
//   options: ['first', 'second']
// }

export class BetPageContainer extends Component {
  optionTransformer(data) {
    const currentOptions = []
    Object.keys(data).forEach((key, index) => {
      if(key.startsWith('option')) {
        currentOptions.concat({ key: key[index] })
      }
    })

    return currentOptions
  }

  createBet = async (data) => {
    const { client } = this.props

    const currentOptions = this.optionTransformer(data)

    await client.mutate({
      mutation: addBet,
      variables: { ...data, options: currentOptions }
    })
  }

  render() {
    return (
      <FormContainer onSubmit={this.createBet}>
        <TextInput name='title' placeholder='Title' />
        <TextArea name='description' placeholder='Description' />
        <AmountInput name='amount' value='0.00' />
        <TextInput name='option1' placeholder='Write your option' />
        <TextInput name='option2' placeholder='Write your option' />
        <Button>Create Bet</Button>
      </FormContainer>
    )
  }
}

export default withApollo(BetPageContainer)
