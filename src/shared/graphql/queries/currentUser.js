import gql from 'graphql-tag'

export default gql`
{
  currentUser{
     _id,
     username
  }
}`
