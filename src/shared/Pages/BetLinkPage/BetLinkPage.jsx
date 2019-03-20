import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'

if (process.browser) {
  require('./BetLinkPage.scss')
}

const BetLinkPage = ({ betId }) =>
  <Fragment>
    <PageTitle className="BetLinkPage__title">Share this link</PageTitle>
    <p className="BetLinkPage__link">{`http://idareou.com/${betId}`}</p>
    <Link className="BetLinkPage__button" to="/dashboard">Go to Dashboard</Link>
  </Fragment>

BetLinkPage.propTypes = {
  betId: Proptypes.string
}

export default BetLinkPage
