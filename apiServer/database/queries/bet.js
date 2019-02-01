import { Bet } from '../models'

export const findBet = async (id) => (
  Bet.findById(id).then()
)
