import React from 'react'

import { FormContainer } from '../FormContainer'
import { TextInput } from '../../Components/Common/TextInput'
import { Button } from '../../Components/Common/Button'

export const LoginPageContainer = () =>
  <FormContainer>
    <TextInput name='Email' placeholder='Email' />
    <TextInput type='password' name='Password' placeholder='Password' />
    <Button>Log in</Button>
  </FormContainer>

export default LoginPageContainer
