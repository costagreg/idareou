import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

// import PropTypes from 'prop-types'

if(process.browser) {
  require('./UserList.scss')
}

const UserList = (props) => {
  console.log(props)
  return(
    <div className="userList--modifer">

    </div>
  )
}

const query = gql`
  {
    users{
      _id,
      username
    }
  }
`


export default graphql(query)(UserList)
