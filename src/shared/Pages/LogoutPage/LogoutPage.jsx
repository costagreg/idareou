import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { currentUser } from '~src/shared/graphql/queries'

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
      query: currentUser,
      fetchPolicy: 'network-only'
    }).then((result) => {
      if (result.data.currentUser === null) {
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

LogoutPage.propTypes = {
  client: Proptypes.object,
  history: Proptypes.object
}

export default withRouter(withApollo(LogoutPage))
