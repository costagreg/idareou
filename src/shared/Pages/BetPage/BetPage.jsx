import React from 'react'

import { PageTitle } from '../../Components/Common/PageTitle'
import { FormContainer } from '../../Containers/FormContainer'
import { TextInput } from '../../Components/Common/TextInput'
import { TextArea } from '../../Components/Common/TextArea'
import { AmountInput } from '../../Components/Common/AmountInput'

if(process.browser) {
  require('./BetPage.scss')
}

const BetPage = () =>
  <div className="BetPage">
    <PageTitle className="BetPage__title">BetPage</PageTitle>
    <FormContainer>
      <TextInput name='title' placeholder='Title' />
      <TextArea name='description' placeholder='Description' />
      <AmountInput name='amount' value='0.00' />
   </FormContainer>
  </div>

export default BetPage
