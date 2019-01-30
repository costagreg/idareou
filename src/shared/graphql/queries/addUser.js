import gql from 'graphql-tag'

export default gql`
mutation AddUser($username: String!,$password: String!,$email: String!,$monzouser: String!){
  addUser(username: $username, password: $password, email: $email, monzouser: $monzouser){
    _id
    username
  }
}`
