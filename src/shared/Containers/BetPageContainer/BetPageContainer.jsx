import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { addBet } from '~src/shared/graphql/mutations/betMutation'
import { currentBets } from '~src/shared/graphql/queries'

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

  saveAndRedirect = async (newBetId) => {
    const { history, client } = this.props

    await client.writeData({ data: { betAdded: newBetId }})

    history.push(`/sharelink/${newBetId}`)
  }

  createBet = async (formData) => {
    const { client } = this.props

    const currentOptions = this.optionTransformer(formData)

    try {
      const { data } = await client.mutate({
        mutation: addBet,
        variables: {
          ...formData,
          options: currentOptions,
          amount: parseFloat(formData.amount)
        },
        refetchQueries: [{ query: currentBets }] // TODO: Change when https://github.com/apollographql/apollo-feature-requests/issues/1 is fixed
      })

     await this.saveAndRedirect(data.addBet._id)
    }
    catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <FormContainer onSubmit={this.createBet}>
        <TextInput name='title' placeholder='Title' required/>
        <TextArea name='description' placeholder='Description' required/>
        <AmountInput name='amount' value='0.00' />
        {
          this.state.options.map((opt, index) =>
            <TextInput key={`${opt.name}-${index}`} name={opt.name} placeholder={opt.placeholder} required />)
        }
        <Button>Create Bet</Button>
      </FormContainer>
    )
  }
}

BetPageContainer.propTypes = {
  client: Proptypes.object,
  history: Proptypes.object
}

export default withRouter(withApollo(BetPageContainer))
