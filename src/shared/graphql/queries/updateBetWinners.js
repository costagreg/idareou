import gql from 'graphql-tag'

export default gql`
mutation UpdateBetWinners($betId: String!, $optionId: String!) {
  updateBetWinners(betId: $betId, optionId: $optionId) {
    title,
    description,
    winners{
      _id
    }
  }
}`
