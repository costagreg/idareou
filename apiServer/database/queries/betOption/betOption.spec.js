import { BetOption } from '../../models'

import { addBetOption, findBetOptions, updateOption } from './betOption'

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

        const betFound = await findBetOptions([betCreated.id])

        expect(betFound[0]._id).toEqual(betCreated._id)
        expect(betFound[0].title).toEqual(betCreated.title)
      })
    })
    describe('when bet option id has not been created already', () => {
      it('should return an empy array', async () => {
        const newBet = { title: 'titleMock', _id: '847290dskdjs01' }

        const betFound = await findBetOptions([newBet.id])

        expect(betFound).toEqual([])
      })
    })
  })
  describe('when trying to update a bet', () => {
    it('should update the bet', async () => {
      const option = await BetOption.create({ title: 'titleMock' })

      const newProps = { title: 'newTitleMock', isWinner: true }
      const optionUpdated = await updateOption(option.id, newProps)

      expect(optionUpdated.title).toEqual(newProps.title)
      expect(optionUpdated.isWinner).toEqual(newProps.isWinner)
    })
  })
})
