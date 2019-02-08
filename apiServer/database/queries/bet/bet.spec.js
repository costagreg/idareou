import { Bet, User } from '../../models'
import { findBet } from './bet'

describe('Bet queries', () => {
  describe('findBet', () => {
    it('finds bet by id', async () => {
      const user = new User({
        username: 'mockUsername'
      })
      await user.save()
      const bet = new Bet({
        title: 'mockTitle',
        users: [user.id]
      })
      await bet.save()

      const betFound = await findBet(bet.id)
      expect(betFound.id).toEqual(bet.id)
      expect(betFound.title).toEqual('mockTitle')
      expect(betFound.users).not.toBe(null)
    })
  })
})
