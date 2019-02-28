import { Bet } from '../../models'

export const findBet = (id) => (
  Bet.findById(id)
)

export const addBet = (data) => (
  Bet.create(data)
)

export const updateBetParticipant = async (betId, userId, optionId) => {
  const newParticipant = [{
    userId,
    optionId
  }]

  const updatedBet = await Bet.update(
    { _id: betId },
    { $push: { participants: newParticipant } }
  )

  return updatedBet
}
