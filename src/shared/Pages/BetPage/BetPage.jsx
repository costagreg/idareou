import React from 'react'
import { PageTitle } from 'Components/Common/PageTitle'
import BetPageContainer from 'Containers/BetPageContainer'

if(process.browser) {
  require('./BetPage.scss')
}

const BetPage = () =>
  <div className="BetPage">
    <PageTitle className="BetPage__title">BetPage</PageTitle>
    <BetPageContainer />
  </div>

export default BetPage
