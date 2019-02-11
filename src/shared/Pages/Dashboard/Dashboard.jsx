import React from 'react'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'

if (process.browser) {
  require('./Dashboard.scss')
}

const Dashboard = () =>
  <div className="Dashboard">
    <PageTitle className="Dashboard__title">Dashboard</PageTitle>
  </div>

export default Dashboard
