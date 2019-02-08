import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { addUser, currentUser } from '~src/shared/graphql/queries'
import { FormContainer } from '../FormContainer'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'

export class SignUpPageContainer extends Component {
  checkAndSaveData = formData => {
    this.props.mutate({
      variables: formData
    }).then(({ data }) => {
      if(data && data.addUser && data.addUser._id) {
        this.props.client.query({
          query: currentUser,
          fetchPolicy: 'network-only'
        }).then(() => {
          this.props.history.push('/dashboard')
        })
      }
    })
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

export default withRouter(withApollo(graphql(addUser)(SignUpPageContainer)))
