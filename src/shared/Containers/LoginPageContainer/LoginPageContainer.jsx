import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { loginUser, currentUser } from '~src/shared/graphql/queries'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export class LoginPageContainer extends Component {
  state = {
    error: false
  }

  checkUser = async (formData) => {
    const { client, history } = this.props
    const loggedUser = await client.mutate({
      mutation: loginUser,
      variables: formData
    })
    const { data: { login } } = loggedUser
    this.setState({ error: false })
    if (login && login.token) {
      const user = await client.query({
        query: currentUser,
        fetchPolicy: 'network-only'
      })
      if (user.data.currentUser) {
        history.push('/dashboard')
      }
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <FormContainer onSubmit={this.checkUser} updateForm={this.updateForm} >
        <TextInput type='email' name='email' placeholder='Email' icon='at' error={ this.state.error ? 'error' : '' } required />
        <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' error={ this.state.error ? 'error' : '' } required />
        {this.state.error ? <p>Ops your nickname/password is wrong</p> : null}
        <Button>Log in</Button>
      </FormContainer>
    )
  }
}

LoginPageContainer.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}


export default withRouter(withApollo(LoginPageContainer))
