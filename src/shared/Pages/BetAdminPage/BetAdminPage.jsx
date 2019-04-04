import React, { Fragment } from 'react'
import Proptypes from 'prop-types'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'
import BetAdminPageContainer from '~src/shared/Containers/BetAdminPageContainer'

if (process.browser) {
  require('./BetAdminPage.scss')
}

const BetAdminPage = (props) =>
  <Fragment>
    <PageTitle className="BetAdminPage__title">Manage bet</PageTitle>
    <BetAdminPageContainer betId={props.match.params.id} />
  </Fragment>

BetAdminPage.propTypes = {
  match: Proptypes.object
}

export default BetAdminPage
