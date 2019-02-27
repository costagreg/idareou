import { BetOption } from '../../models'

import { addBetOption, findBetOption } from './betOption'

describe('Betptions', () => {
  describe('when calling addBetOptiopns', async () => {
    it('should add a new betoption into betoptions document when title is passed', async () => {
      const newBet = { title: 'titleMock' }

      const betCreated = await addBetOption(newBet)

      const betSaved = await BetOption.findById(betCreated.id)

      expect(betSaved.title).toBe(newBet.title)
    })
  })
  describe('when trying to find bet', () => {
    describe('when bet option id has been created already', () => {
      it('should find the betoption', async () => {
        const newBet = { title: 'titleMock' }

        const betCreated = await BetOption.create(newBet)

        const betFound = await findBetOption(betCreated.id)

        expect(betFound._id).toEqual(betCreated._id)
        expect(betFound.title).toEqual(betCreated.title)
      })
    })
    describe('when bet option id has not been created already', () => {
      it('should return null', async () => {
        const newBet = { title: 'titleMock', _id: '847290dskdjs01' }

        const betFound = await findBetOption(newBet.id)

        expect(betFound).toBe(null)
      })
    })
  })
})
