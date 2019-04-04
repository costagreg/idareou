import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'
import shortid from 'shortid'

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
    this.state = {
      options: [`option-${shortid.generate()}`]
    }
  }

  optionTransformer(data) {
    const currentOptions = []
    Object.entries(data).filter(([key, value]) => {
      if(this.state.options.find(opt => opt === key)) {
        currentOptions.push(value)
      }
    })

    return currentOptions
  }

  saveAndRedirect = async (newBetId) => {
    const { history, client } = this.props

    await client.writeData({ data: { betAdded: newBetId } })

    history.push(`/sharelink/${newBetId}`)
  }

  addOption = () => {
    const { options } = this.state

    this.setState({
      options: options.concat(`option-${shortid.generate()}`)
    })
  }

  removeIcon = (removeIndex) => {
    this.setState({
      options: this.state.options.filter(opt => opt !== removeIndex)
    })
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
            <TextInput
              key={opt}
              name={opt}
              placeholder= 'Write your option'
              required
              subIcon={(index !== 0 || this.state.options.length > 1) ? 'minus' : ''}
              subIconClick={() => this.removeIcon(opt)}
            />)
        }
        <Button type='button' onClick={this.addOption}>Add Option</Button>
        <Button type='submit'>Create Bet</Button>
      </FormContainer>
    )
  }
}

BetPageContainer.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}

export default withRouter(withApollo(BetPageContainer))
