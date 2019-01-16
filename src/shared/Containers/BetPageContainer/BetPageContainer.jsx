import React from 'react'

import { TextInput } from '~Components/Common/TextInput'
import { TextArea } from '~Components/Common/TextArea'
import { AmountInput } from '~Components/Common/AmountInput'
import { TextCheckBox } from '~Components/Common/TextCheckBox'
import { Button } from '~Components/Common/Button'
import { FormContainer } from '../FormContainer'

export const BetPageContainer = () =>
  <FormContainer>
    <TextInput name='title' placeholder='Title' />
    <TextArea name='description' placeholder='Description' />
    <AmountInput name='amount' value='0.00' />
    <TextCheckBox name='betoption1' placeholder='Bet Option 1' />
    <TextCheckBox name='betoption2' placeholder='Bet Option 2' />
    <Button>Create Bet</Button>
  </FormContainer>

export default BetPageContainer
