import gql from 'graphql-tag'

export default gql`
mutation CheckUser($username: String!,$password: String!){
  checkUser(username: $username, password: $password){
    _id
    username
    email
  }
}`
