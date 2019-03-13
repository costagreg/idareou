import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

import { addUser, currentUser } from '~src/shared/graphql/queries'
import { FormContainer } from '../FormContainer'
import { TextInput } from '~src/shared/Components/Common/TextInput'
import { Button } from '~src/shared/Components/Common/Button'

export class JoinBetPage extends Component {

  render() {
    return (
      <FormContainer>
      </FormContainer>
    )
  }
}

JoinBetPage.propTypes = {
  client: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired
}

export default withRouter(withApollo(JoinBetPage))
