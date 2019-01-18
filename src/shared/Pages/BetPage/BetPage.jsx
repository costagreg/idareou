import React from 'react'
import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import BetPageContainer from '~src/shared/Containers/BetPageContainer'

if(process.browser) {
  require('./BetPage.scss')
}

const BetPage = () =>
  <div className="BetPage">
    <PageTitle className="BetPage__title">BetPage</PageTitle>
    <BetPageContainer />
  </div>

export default BetPage
