import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import HistoryPageContainer from '~src/shared/Containers/HistoryPageContainer'

const HistoryPage = () => {
  return <div className="BetPage">
    <PageTitle className="BetPage__title">Your bets</PageTitle>
    <HistoryPageContainer />
  </div>
}

HistoryPage.propTypes = {

}

export default HistoryPage
