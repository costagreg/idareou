import { User } from '../database/models'

export const addUser = (username, password, email, monzouser) => (
  User.create({ username, password, email, monzouser }).then()
)

export const deleteUser = (id) => {
  const user = await User.findById(id)
  await user.remove().then()
  return user
}

export const updateUser = (id, username, password, email, monzouser) => (
  User.findByIdAndUpdate({ _id: id }, { username, password, email, monzouser })
    .then(() => User.findById({ _id: id }))
    .then()
)

export const findUsers = (ids) => (
  User.find({ _id: { $in: ids } }).then()
)
