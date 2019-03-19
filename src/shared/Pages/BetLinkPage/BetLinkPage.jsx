import React, { Fragment } from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'

if (process.browser) {
  require('./BetLinkPage.scss')
}

const BetLinkPage = ({ betId }) =>
  <Fragment>
    <PageTitle className="BetLinkPage__title">Share this link</PageTitle>
    <p className="BetLinkPage__link">{`http://dareme.com/${betId}`}</p>
    <p className="BetLinkPage__secondTitle">Or send them an email</p>
  </Fragment>
export default BetLinkPage
