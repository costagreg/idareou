import React from 'react'

import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export const LoginPageContainer = () =>
  <FormContainer>
    <TextInput type='email' name='email' placeholder='Email' required/>
    <TextInput type='password' name='password' placeholder='Password' required/>
    <Button>Log in</Button>
  </FormContainer>

export default LoginPageContainer
