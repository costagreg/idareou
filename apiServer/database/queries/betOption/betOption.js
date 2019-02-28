import { BetOption } from '../../models'

export const addBetOption = title =>
  BetOption.create(title)

export const findBetOption = async (id) => {
  const currentBetOption = await BetOption.findById(id)

  return currentBetOption
}
