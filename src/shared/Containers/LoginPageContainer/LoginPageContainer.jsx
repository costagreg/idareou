import React from 'react'

import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'
import { FormContainer } from '../FormContainer'

export const LoginPageContainer = () =>
  <FormContainer onSubmit={() => {}}>
    <TextInput type='email' name='email' placeholder='Email' icon='at' required/>
    <TextInput type='password' name='password' placeholder='Password' icon='unlock-alt' required/>
    <Button>Log in</Button>
  </FormContainer>

export default LoginPageContainer
