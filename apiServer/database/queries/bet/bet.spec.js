import { Bet, User } from '../../models'
import { findBet } from './bet'

fdescribe('Bet queries', () => {
  describe('addBet', async () => {
  //   const bet = new Bet({
  //     title: 'title',
  //     description: 'description',
  //     amount: 10,
  //     currency: '£',
  //     options: [],
  //     participants: []
  //   })
  })
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
      expect(betFound.participate).not.toBe(null)
    })
  })
})
