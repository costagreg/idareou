import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import { loginUser, currentUser } from '~src/shared/graphql/queries'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export class LoginPageContainer extends Component {
  checkUser = async (formData, updateError) => {
    const { client, history, location } = this.props
    const loggedUser = await client.mutate({
      mutation: loginUser,
      variables: formData
    })
    const { data: { login } } = loggedUser
    if (login && login.token) {
      const user = await client.query({
        query: currentUser,
        fetchPolicy: 'network-only'
      })
      if (user.data.currentUser) {
        const { state = {} } = location

        history.push(state.from || '/dashboard')
      }
    } else {
      updateError('password', 'Your username/password is wrong')
    }
  }

  render() {
    const { state = {} } = this.props.location

    return (
      <FormContainer onSubmit={this.checkUser}>
        <TextInput type='email' name='email' placeholder='Email' icon='at' required />
        <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' required />
        <p className='LoginPage__Msg'>
          Are you not a user yet?
          <Link to={{ pathname: '/signup', state: { from: state.from } }}>
            Sign up
          </Link>
        </p>
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
