import gql from 'graphql-tag'

export default gql`
{
  currentBets{
    _id,
    title,
    description,
    amount,
    currency,
    master,
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
