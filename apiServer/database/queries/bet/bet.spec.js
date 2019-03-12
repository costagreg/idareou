import { Bet, BetOption, User } from '../../models'
import { findBet, addBet, updateBetParticipant, findBetByUser } from './bet'

describe('Bet queries', () => {
  const bet = {
    title: 'title',
    description: 'description',
    amount: 10.00,
    currency: '$',
    options: [],
    participants: []
  }

  describe('addBet', () => {
    describe('when currency is passed', () => {
      it('should create a new bet with currency passed', async () => {
        const betCreated = await addBet(bet)

        const betFound = await Bet.findById(betCreated._id)

        expect(betFound.title).toBe(bet.title)
        expect(betFound.description).toBe(bet.description)
        expect(betFound.amount).toBe(bet.amount)
        expect(betFound.currency).toBe(bet.currency)
        expect(betFound.options.length).toEqual(bet.options.length)
        expect(betFound.participants.length).toEqual(bet.participants.length)
      })
    })
    describe('when currency is not passed', () => {
      it('should create a new bet with default currency £', async () => {
        const betCreated = await addBet({ ...bet, currency: undefined })

        const betFound = await Bet.findById(betCreated._id)

        expect(betFound.title).toBe(bet.title)
        expect(betFound.description).toBe(bet.description)
        expect(betFound.amount).toBe(bet.amount)
        expect(betFound.currency).toBe('£')
        expect(betFound.options.length).toEqual(bet.options.length)
        expect(betFound.participants.length).toEqual(bet.participants.length)
      })
    })
  })
  describe('findBet', () => {
    it('finds bet by id if exist', async () => {
      const betCreated = await addBet(bet)

      const betFound = await findBet(betCreated._id)

      expect(betFound._id).toEqual(betCreated._id)
      expect(betFound.title).toBe(betCreated.title)
      expect(betFound.amount).toBe(betCreated.amount)
      expect(betFound.currency).toBe(bet.currency)
      expect(betFound.options.length).toEqual(bet.options.length)
      expect(betFound.participants.length).toEqual(bet.participants.length)
    })
  })
  describe('updateBetParticipant', () => {
    it('should update a bet created with userId and optionId as a participan', async () => {
      const betCreated = await Bet.create(bet)

      const newBetOption = await BetOption.create({ title: 'newTitle' })

      const newUser = await User.create({ username: 'newUser' })

      const beforeBeforeUpdate = await Bet.findById(betCreated._id)

      expect(beforeBeforeUpdate.participants.length).toBe(bet.participants.length)

      await updateBetParticipant(betCreated._id, newUser._id, newBetOption._id)

      const betAfterUpdate = await Bet.findById(betCreated._id)

      expect(betAfterUpdate.participants[0].option.toString()).toEqual(newBetOption._id.toString())
      expect(betAfterUpdate.participants[0].user.toString()).toEqual(newUser._id.toString())
    })
  })

  describe('findBetByUser', () => {
    it('should return the bet if the id passed is in the master attribute', async () => {
      const user1 = await User.create({ username: 'userMaster' })
      const user2 = await User.create({ username: 'participant1' })
      const user3 = await User.create({ username: 'partecipant2' })

      const betProps = {
        ...bet,
        master: user1._id,
        participants: [{ user: user2._id }, { user: user3._id }]
      }
      const newBet = await Bet.create(betProps)
      const betFound = await findBetByUser(user1._id)

      expect(betFound[0]._id).toEqual(newBet._id)
    })

    it('should return the bet if the id passed is in the partecipants attribute', async () => {
      const user1 = await User.create({ username: 'userMaster' })
      const user2 = await User.create({ username: 'participant1' })
      const user3 = await User.create({ username: 'partecipant2' })

      const betProps = {
        ...bet,
        master: user1._id,
        participants: [{ user: user2._id }, { user: user3._id }]
      }
      const newBet = await Bet.create(betProps)
      const betFound = await findBetByUser(user3._id)

      expect(betFound[0]._id).toEqual(newBet._id)
    })
  })
})
