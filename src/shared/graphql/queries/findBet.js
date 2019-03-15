import gql from 'graphql-tag'

export default gql`
  query FindBet($id: String!){
    findBet(id: $id){
      _id,
      title,
      description,
      amount,
      currency,
      participants{
        user{
          _id,
          username
        }
      },
      options{
        title
      }
    }
  }`
