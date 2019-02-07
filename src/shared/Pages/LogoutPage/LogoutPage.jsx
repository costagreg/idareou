import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { me } from '~src/shared/graphql/queries'

import { PageTitle } from '~src/shared/Components/Common/PageTitle'

if (process.browser) {
  require('./LogoutPage.scss')
}

class LogoutPage extends Component {
  componentDidMount() {
    document.cookie = 'token=s;path=/;domain=.local.idareyou.com;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    this.props.client.query({
      query: me,
      fetchPolicy: 'network-only'
    })
  }

  render() {
    return (<div className="LogoutPage">
      <PageTitle>You have been logout successfully</PageTitle>
      <p className='LogoutPage__Msg'>Invite a friend <Link to='/invite'>Send invite</Link></p>
    </div>)
  }
}

export default withApollo(LogoutPage)
