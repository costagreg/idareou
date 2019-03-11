import { Bet } from '../../models'

export const findBet = (id) => (
  Bet.findById(id)
)

export const addBet = (data) => (
  Bet.create(data)
)

export const updateBetParticipant = async (betId, userId, optionId) => {
  const newParticipant = [{
    user: userId,
    option: optionId
  }]

  const updatedBet = await Bet.update(
    { _id: betId },
    { $push: { participants: newParticipant } }
  )

  return updatedBet
}

export const findBetByUser = (id) => (
  Bet.find({ $or: [{ 'participants.user': id }, { master: id }] })
)
