import { User } from '../models'

export const addUser = async (data) => (
  User.create(data).then()
)

export const deleteUser = async (id) => {
  const user = await User.findById(id)
  await user.remove().then()
  return user
}

export const updateUser = async (id, newData) => (
  User.findByIdAndUpdate({ _id: id }, newData)
    .then(() => User.findById({ _id: id }))
    .then()
)

export const findUsers = async (ids) => (
  User.find({ _id: { $in: ids } }).then()
)

export const findUser = async (data) => (
  User.find(data)
)
