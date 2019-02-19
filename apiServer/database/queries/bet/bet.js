import { Bet } from '../../models'

export const findBet = (id) => (
  Bet.findById(id)
)

export const addBet = (data) => (
  Bet.create(data)
)
