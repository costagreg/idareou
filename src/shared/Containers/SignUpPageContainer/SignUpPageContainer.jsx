import React, { Component } from 'react'

import { FormContainer } from '../FormContainer'
import { TextInput } from '../../Components/Common/TextInput'
import { Button } from '../../Components/Common/Button'

class SignUpPageContainer extends Component {
  checkAndSaveData = formData => {
    console.log(formData)
  }

  render() {
    return (
      <FormContainer onSubmit={this.checkAndSaveData}>
        <TextInput type='text' name='firstname' placeholder='Username' icon='user' required/>
        <TextInput type='email' name='email' placeholder='Email' icon='at' required/>
        <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' required/>
        <TextInput type='password' name='confirm' placeholder='Confirm' icon='unlock-alt' required/>
        <TextInput type='text' name='monzouser' placeholder='Monzouser' icon='credit-card' required/>
        <Button>Submit</Button>
      </FormContainer>
    )
  }
}

export default SignUpPageContainer
