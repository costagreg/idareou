import { BetOption } from '../../models'

export const addBetOption = (title) =>
  BetOption.create(title)
