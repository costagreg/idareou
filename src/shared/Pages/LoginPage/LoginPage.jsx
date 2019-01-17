import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import { LoginPageContainer } from '~src/shared/Containers/LoginPageContainer'

if(process.browser) {
  require('./LoginPage.scss')
}

const LoginPage = () =>
  <div className="LoginPage">
    <PageTitle>Login</PageTitle>
    <LoginPageContainer />
    <p className='LoginPage__Msg'>Are you not a user yet? <a href=''>Sign up</a></p>
  </div>

export default LoginPage
