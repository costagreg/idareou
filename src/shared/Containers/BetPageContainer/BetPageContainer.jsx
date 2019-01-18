import React from 'react'

import { TextInput } from '~src/shared/Components/Common/TextInput'
import { TextArea } from '~src/shared/Components/Common/TextArea'
import { AmountInput } from '~src/shared/Components/Common/AmountInput'
import { TextCheckBox } from '~src/shared/Components/Common/TextCheckBox'
import { Button } from '~src/shared/Components/Common/Button'
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
