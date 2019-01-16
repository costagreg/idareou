import React from 'react'

import { TextInput } from '~Components/Common/TextInput'
import { Button } from '~Components/Common/Button'
import { FormContainer } from '../FormContainer'

export const LoginPageContainer = () =>
  <FormContainer>
    <TextInput name='email' placeholder='Email' />
    <TextInput type='password' name='password' placeholder='Password' />
    <Button>Log in</Button>
  </FormContainer>

export default LoginPageContainer
