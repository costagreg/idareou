import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import { JoinBetContainer } from '~src/shared/Containers/JoinBetContainer'

if (process.browser) {
  require('./JoinBetPage.scss')
}

const JoinBetPage = () => (
  <div className="JoinBet">
    <PageTitle>Join Bet</PageTitle>
    <JoinBetContainer />
  </div>
)

export default JoinBetPage
