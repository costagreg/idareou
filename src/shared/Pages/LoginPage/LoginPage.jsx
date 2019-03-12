import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import LoginPageContainer from '~src/shared/Containers/LoginPageContainer'

if(process.browser) {
  require('./LoginPage.scss')
}

const LoginPage = () =>
  <div className="LoginPage">
    <PageTitle>Login</PageTitle>
    <LoginPageContainer />
  </div>

export default LoginPage
