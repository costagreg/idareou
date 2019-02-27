import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import { addBet } from '~src/shared/graphql/mutations/betMutation'

import { TextInput } from '~src/shared/Components/Common/TextInput'
import { TextArea } from '~src/shared/Components/Common/TextArea'
import { AmountInput } from '~src/shared/Components/Common/AmountInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export class BetPageContainer extends Component {
  constructor(props) {
    super(props)
    this.optionTemplate = { name: 'option', placeholder: 'Write your option' }
    this.state = {
      options: [this.optionTemplate]
    }
  }

  optionTransformer(data) {
    const currentOptions = []
    Object.entries(data).filter(([key, value]) => {
      if(key.startsWith('option')) {
        currentOptions.push(value)
      }
    })

    return currentOptions
  }

  createBet = async (data) => {
    const { client } = this.props

    const currentOptions = this.optionTransformer(data)

    await client.mutate({
      mutation: addBet,
      variables: {
        ...data,
        options: currentOptions,
        amount: parseFloat(data.amount)
      }
    })
  }

  render() {
    return (
      <FormContainer onSubmit={this.createBet}>
        <TextInput name='title' placeholder='Title' required/>
        <TextArea name='description' placeholder='Description' required/>
        <AmountInput name='amount' value='0.00' />
        {
          this.state.options.map((opt, index) =>
            <TextInput key={`${opt.name}-${index}`} name={opt.name} placeholder={opt.placeholder} />)
        }
        <Button>Create Bet</Button>
      </FormContainer>
    )
  }
}

export default withApollo(BetPageContainer)
