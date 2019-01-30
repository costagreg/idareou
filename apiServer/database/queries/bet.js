import { Bet } from '../models'

export const findBet = (id) => (
  Bet.findById(id).then()
)
