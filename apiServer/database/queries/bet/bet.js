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

export const updateBetWinners = async (betId) => {
  const bet = await Bet
    .findById(betId)
    .populate([
      { path: 'options' },
      { path: 'participants.user' },
      { path: 'participants.option' }
    ])

  const winnerUsers = bet.participants.reduce((winners, partecipant) => {
    const { option, user: { _id: userId } } = partecipant

    if (option.isWinner) {
      winners.push(userId)
    }

    return winners
  }, [])

  return Bet.findByIdAndUpdate(betId, { winners: winnerUsers }, { new: true })
}
