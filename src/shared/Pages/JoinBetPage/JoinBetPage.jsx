import React from 'react'
import Proptypes from 'prop-types'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import JoinBetContainer from '~src/shared/Containers/JoinBetContainer'

if (process.browser) {
  require('./JoinBetPage.scss')
}

const JoinBetPage = (props) => (
  <div className="JoinBetPage">
    <PageTitle>Join Bet</PageTitle>
    <JoinBetContainer betId={props.match.params.id} />
  </div>
)

JoinBetPage.propTypes = {
  match: Proptypes.object
}

export default JoinBetPage
