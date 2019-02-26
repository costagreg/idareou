import gql from 'graphql-tag'

export default gql`
  mutation AddBet($title: String!,$description: String!,$amount: Float!,$currency: String, $options: [String]) {
    addBet(title: $title,description: $description, amount: $amount,currency: $currency, options: $options) {
      _id,
      title
    }
  }`
