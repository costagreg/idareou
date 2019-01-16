import React from 'react'

import { PageTitle } from '~Components/Common/PageTitle'

if (process.browser) {
  require('./HomePage.scss')
}

const HomePage = () =>
  <div className="Homepage">
    <PageTitle className="Homepage__title">HomePage</PageTitle>
  </div>

export default HomePage
