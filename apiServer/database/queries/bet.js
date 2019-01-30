import { User } from '../database/models'

export const findBetByUser = (id) => (
  User.find({ _id: { $in: id } }).then()
)
