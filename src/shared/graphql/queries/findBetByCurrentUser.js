import gql from 'graphql-tag'

export default gql`
{
  findBetByCurrentUser{
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
