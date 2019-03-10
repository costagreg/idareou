import { graphql } from 'graphql'
import { schema } from '../../schema'

import { Bet, User } from '../../../database/models'

describe('Bet queries', () => {
  describe('findBetByUser', () => {
    it('returns all bets involved with an user', async () => {
      const context = {}
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

      const query = `
      {
        findBetByUser(_id: "${user2._id.toString()}"){
          _id
        }
      }`
      const result = await graphql(schema, query, {}, context)
      const { data: { findBetByUser } } = result

      expect(findBetByUser[0]._id).toEqual(bet._id.toString())


    })
  })
})
