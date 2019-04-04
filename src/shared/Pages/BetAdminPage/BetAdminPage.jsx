import React from 'react'
import Proptypes from 'prop-types'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import BetAdminPageContainer from '~src/shared/Containers/BetAdminPageContainer'

if (process.browser) {
  require('./BetAdminPage.scss')
}

const BetAdminPage = (props) =>
  <div className="betadminpage">
    <PageTitle className="betadminpage__title">Manage bet</PageTitle>
    <BetAdminPageContainer betId={props.match.params.id} />
  </div>

BetAdminPage.propTypes = {
  match: Proptypes.object
}

export default BetAdminPage
