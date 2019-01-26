import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { FormContainer } from '../FormContainer'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'

class SignUpPageContainer extends Component {
  checkAndSaveData = formData => {
    this.props.mutate({ variables: formData })
  }

  render() {
    return (
      <FormContainer onSubmit={this.checkAndSaveData}>
        <TextInput type='text' name='username' placeholder='Username' icon='user' required />
        <TextInput type='email' name='email' placeholder='Email' icon='at' required />
        <TextInput type='password' name='password' placeholder='Password Min 6' pattern='^.{6,}$' icon='unlock-alt' required />
        <TextInput type='password' name='confirmPassword' placeholder='Confirm Password' pattern='^.{6,}$' icon='unlock-alt' required />
        <TextInput type='text' name='monzouser' placeholder='Monzouser' icon='credit-card' required />
        <Button>Submit</Button>
      </FormContainer>
    )
  }
}
const mutation = gql`
  mutation AddUser($username: String!,$password: String!,$email: String!,$monzouser: String!){
    addUser(username: $username, password: $password, email: $email, monzouser: $monzouser){
      _id
      username
    }
  }
`
export default graphql(mutation)(SignUpPageContainer)
