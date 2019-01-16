import React from 'react'

import { PageTitle } from '../../Components/Common/PageTitle'
import SignUpPageContainer from '../../Containers/SignUpPageContainer'

if(process.browser) {
  require('./SignUpPage.scss')
}

const SignUpPage = () =>
  <div className="SignUpPage">
    <PageTitle>SignUp</PageTitle>
    <SignUpPageContainer />
</div>

export default SignUpPage
