import { UserType } from '../../types'
import { findUserById } from '../../../database/queries/user'

export const userQuery = {
  currentUser: {
    type: UserType,
    resolve(parentValue, args, { req: { user } }) {
      // Grab the user is from the cookie instead of args
      if (user) {
        return findUserById(user._id)
      }
    }
  }
}
