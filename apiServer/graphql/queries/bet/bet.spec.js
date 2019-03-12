import { graphql } from 'graphql'
import { schema } from '../../schema'

import { Bet, User } from '../../../database/models'

describe('Bet queries', () => {
  describe('currentBets', () => {
    it('returns all bets involved with the current user', async () => {
      const user1 = await User.create({ username: 'userMaster' })
      const user2 = await User.create({ username: 'participant1' })
      const user3 = await User.create({ username: 'partecipant2' })
      const bet = await Bet.create({
        title: 'title',
        description: 'description',
        amount: 10.00,
        currency: '$',
        master: user1._id,
        participants: [{ user: user2._id }, { user: user3._id }]
      })
      const context = { req: { user: { _id: user3._id.toString() } } }

      const query = `
      {
        currentBets{
          _id
        }
      }`
      const result = await graphql(schema, query, {}, context)
      const { data: { currentBets } } = result

      expect(currentBets[0]._id).toEqual(bet._id.toString())


    })
  })
})
