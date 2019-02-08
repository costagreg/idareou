import { User } from '../models'

export const addUser = (data) => (
  User.create(data)
)

export const deleteUser = async (id) => {
  const user = await User.findById(id)
  await user.remove()
  return user
}

export const updateUser = (id, newData) => (
  User.findByIdAndUpdate({ _id: id }, newData)
    .then(() => User.findById({ _id: id })))

export const findUsers = (ids) => (
  User.find({ _id: { $in: ids } }).exec()
)

export const findUser = (data) => (
  User.find(data)
)

export const findUserById = (_id) => (
  User.findById(_id)
)
