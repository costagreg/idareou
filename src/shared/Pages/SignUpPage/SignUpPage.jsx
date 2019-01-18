import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import SignUpPageContainer from '~src/shared/Containers/SignUpPageContainer'

if(process.browser) {
  require('./SignUpPage.scss')
}

const SignUpPage = () =>
  <div className="SignUpPage">
    <PageTitle>SignUp</PageTitle>
    <SignUpPageContainer />
</div>

export default SignUpPage
