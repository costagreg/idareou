import { GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType } from '../../types'
import { findUserById, findUser } from '../../../database/queries/user'

export const userQuery = {
  currentUser: {
    type: UserType,
    resolve(parentValue, args, { req: { user } }) {
      // Grab the user is from the cookie instead of args
      if (user) {
        return findUserById(user._id)
      }
    }
  },
  findUser: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parentValue, { email }, context) {
      console.log(email)
      return findUser({ email })
    }
  }
}
