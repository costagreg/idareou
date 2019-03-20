import { graphql } from 'graphql'
import { schema } from '../../schema'
import { User, Bet, BetOption } from '../../../database/models'

const userData = {
  username: 'usernameMock',
  password: 'passwordMock',
  email: 'emailMock',
  monzouser: 'monzoUser'
}

const betData = {
  title: 'title',
  description: 'description',
  amount: 10.00,
  currency: '$',
  options: []
}

describe('BetMutations', () => {
  describe('addBet', () => {
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
  describe('updateBetParticipant', () => {
    describe('when adding participant to the bet created', () => {
      describe('when user is already created', () => {
        fit('should update the participants in bet', async () => {
          const newUser = await User.create(userData)
          const context = { req: { user: { _id: newUser._id.toString() } } }

          const updateBetParticipantMutation = `
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

          const newBetOption = await BetOption.create({ title: 'options' })

          const newBet = await Bet.create(betData)

          const variables = { betId: newBet._id.toString(), optionId: newBetOption._id.toString() }

          const result = await graphql(schema, updateBetParticipantMutation, {}, context, variables)

          const { data: { updateBetParticipant } } = result

          console.log(result)

          const currentParticipant = updateBetParticipant.participants[0]

          expect(currentParticipant.user._id).toEqual(newUser._id.toString())
          expect(currentParticipant.option._id).toEqual(newBetOption._id.toString())
        })
      })
      describe('when user is not created already', () => {
        it('should not update the participants returning null', async () => {
          const context = { req: {} }

          const updateBetParticipantMutation = `
            mutation UpdateBetParticipant($betId: String!,$optionId: String!) {
              updateBetParticipant(betId: $betId, optionId: $optionId) {
                title,
                description
              }
            }`

          const newBetOption = await BetOption.create({ title: 'options' })

          const newBet = await Bet.create(betData)

          const variables = { betId: newBet._id.toString(), optionId: newBetOption._id.toString() }

          const result = await graphql(schema, updateBetParticipantMutation, {}, context, variables)

          const { data: { updateBetParticipant } } = result

          expect(updateBetParticipant).toBe(null)
        })
      })
    })
  })
})
