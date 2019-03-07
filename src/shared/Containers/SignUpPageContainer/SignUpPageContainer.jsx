import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { addUser, currentUser } from '~src/shared/graphql/queries'
import { FormContainer } from '../FormContainer'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'

export class SignUpPageContainer extends Component {
  state = {
    errors: {}
  }

  checkAndSaveData = async formData => {
    const { client, history } = this.props
    const addUserMutation = await client.mutate({
      mutation: addUser,
      variables: formData,
      errorPolicy: 'all'
    })
    const { data, errors } = addUserMutation

    if (errors) {
      this.setState({ errors: errors.length > 0 ? errors[0].state : [] })
    } else {
      const { addUser: userData } = data
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
  }

  render() {
    return (
      <FormContainer onSubmit={this.checkAndSaveData}>
        <TextInput type='text' name='username' placeholder='Username' icon='user' error={ this.state.errors.username } required />
        <TextInput type='email' name='email' placeholder='Email' icon='at'error={ this.state.errors.email } required />
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
