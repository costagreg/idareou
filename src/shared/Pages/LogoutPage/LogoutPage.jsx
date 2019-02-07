import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { me } from '~src/shared/graphql/queries'

if (process.browser) {
  require('./LogoutPage.scss')
}

class LogoutPage extends Component {
  state = {
    error: false
  }

  componentDidMount() {
    document.cookie = `token=s;path=/;domain=${process.env.COOKIE_DOMAIN};expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    this.props.client.query({
      query: me,
      fetchPolicy: 'network-only'
    }).then((result) => {
      if (result.data.me === null) {
        this.props.history.push('/')
      }
    }).catch(() => {
      this.setState({ error: true })
    })
  }

  render() {
    return (<div> {this.state.error && <p>Ops something went wrong</p>}</div>)
  }
}

export default withRouter(withApollo(LogoutPage))
