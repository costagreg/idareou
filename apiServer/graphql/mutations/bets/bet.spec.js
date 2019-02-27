import { graphql } from 'graphql'
import { schema } from '../../schema'
import { User } from '../../../database/models'

const userData = {
  username: 'usernameMock',
  password: 'passwordMock',
  email: 'emailMock',
  monzouser: 'monzoUser'
}

describe('BetMutations', () => {
  describe('addBet', () => {
    const betData = {
      title: 'title',
      description: 'description',
      amount: 10.00,
      currency: '$',
      options: []
    }
    describe('when the user has been saved previously in the context', () => {
      it('should add a bet when all the parameters are passed', async () => {
        const master = await User.create(userData)
        const context = { req: { user: { _id: master._id.toString() } } }

        const addBetMutation = `
        mutation AddBet($title: String!,$description: String!,$amount: Float!,$currency: String, $options: [String]) {
          addBet(title: $title,description: $description, amount: $amount,currency: $currency, options: $options) {
            title,
            description,
            amount,
            currency
          }
        }`

        const result = await graphql(schema, addBetMutation, {}, context, betData)
        const { data: { addBet } } = result

        expect(addBet.title).toEqual(betData.title)
        expect(addBet.description).toEqual(betData.description)
        expect(addBet.amount).toEqual(betData.amount)
        expect(addBet.currency).toEqual(betData.currency)
      })
    })
    describe('when the user has not been saved previously in the context', () => {
      it('should return nothing', async () => {
        const context = { req: {} }

        const addBetMutation = `
        mutation AddBet($title: String!,$description: String!,$amount: Float!,$currency: String, $options: [String]) {
          addBet(title: $title,description: $description, amount: $amount,currency: $currency, options: $options) {
            title,
            description,
            amount,
            currency
          }
        }`

        const result = await graphql(schema, addBetMutation, {}, context, betData)
        const { data: { addBet } } = result

        expect(addBet).toBe(null)
      })
    })
  })
})
