import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { loginUser } from '~src/shared/graphql/queries'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export class LoginPageContainer extends Component {
  checkUser = formData => {
    const result = this.props.mutate({
      variables: formData
    })
  }

  render() {
    return (
    <FormContainer onSubmit={this.checkUser}>
      <TextInput type='email' name='email' placeholder='Email' icon='at' required />
      <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' required />
      <Button>Log in</Button>
    </FormContainer>
    )
  }
}

export default graphql(loginUser)(LoginPageContainer)
