import { GraphQLString, GraphQLList } from 'graphql'
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
    type: new GraphQLList(UserType),
    args: {
      email: { type: GraphQLString },
      username: { type: GraphQLString }
    },
    resolve(parentValue, params) {
      return findUser(params)
    }
  }
}
