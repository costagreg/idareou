import { BetOption } from '../../models'

export const addBetOption = title =>
  BetOption.create(title)

export const findBetOptions = (ids) => (
  BetOption.find({ _id: { $in: ids } })
)

export const updateOption = (id, update) => (
  BetOption.findByIdAndUpdate(id, update, { new: true })
)
