import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { addUser, currentUser, findUser } from '~src/shared/graphql/queries'
import { FormContainer } from '../FormContainer'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import debouncer from '~src/shared/helpers/debouncer'

export class SignUpPageContainer extends Component {
  checkAndSaveData = async formData => {
    const { client, history } = this.props
    const addUserMutation = await client.mutate({
      mutation: addUser,
      variables: formData
    })
    const { data: { addUser: userData } } = addUserMutation
    if (userData && userData._id) {
      const user = await client.query({
        query: currentUser,
        fetchPolicy: 'network-only'
      })
      if (user) {
        history.push('/dashboard')
      }
    }
  }

  checkEmail = debouncer(async (e, value, updateValue) => {
    const isValidEmail = e.target.checkValidity()
    if (isValidEmail) {
      updateValue(value, 'success')
      const findUserList = await this.props.client.query({
        query: findUser,
        variables: { email: value }
      })
      if (findUserList.data.findUser.length > 0) {
        // valid user
        updateValue(value, 'error')
        e.target.setCustomValidity('Your email is already in use')
        e.target.reportValidity()
      } else {
        updateValue(value, 'success')
      }
    }
  }, 300)

  render() {
    return (
      <FormContainer onSubmit={this.checkAndSaveData} validateOnChange={true}>
        <TextInput type='text' name='username' placeholder='Username' icon='user' required />
        <TextInput type='email' name='email' placeholder='Email' icon='at' required onChange={(e, value, updateValue) => { e.persist(); this.checkEmail(e, value, updateValue) }} />
        <TextInput type='password' name='password' placeholder='Password Min 6' pattern='^.{6,}$' icon='unlock-alt' required />
        <TextInput type='password' name='confirmPassword' placeholder='Confirm Password' pattern='^.{6,}$' icon='unlock-alt' required />
        <TextInput type='text' name='monzouser' placeholder='Monzouser' icon='credit-card' required />
        <Button>Submit</Button>
      </FormContainer>
    )
  }
}

SignUpPageContainer.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}

export default withRouter(withApollo(SignUpPageContainer))
