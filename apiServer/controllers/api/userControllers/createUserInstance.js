import { User } from '../../../database/models'

export const createUserInstance = ({ username, password }) => {
  if(!username || !password) {
    throw Error('No required details provided')
  }
  return User({
    username,
    password,
    laspost: new Date(),
    numpostperday: 0,
    numtotalpost: 0
  })
}