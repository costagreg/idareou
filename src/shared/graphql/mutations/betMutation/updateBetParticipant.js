import gql from 'graphql-tag'

export default gql`
mutation UpdateBetParticipant($betId: String!,$optionId: String!) {
  updateBetParticipant(betId: $betId, optionId: $optionId) {
    title,
    description,
    participants {
      user {
        _id
      }
      option {
        _id
      }
    }
  }
}`
