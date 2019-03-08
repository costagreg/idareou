import gql from 'graphql-tag'

export default gql`
  query FindUser($email: String!){
    findUser(email: $email){
      _id
    }
  }`
