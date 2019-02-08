// import bcrypt from 'bcrypt'
import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType } from '../types'
import { findUser, findUserById } from '../../database/queries/user'
import { findBet } from '../../database/queries/bet'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve(parentValue, args) {
        return findUser(args)
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return findBet(id)
      }
    },
    currentUser: {
      type: UserType,
      async resolve(parentValue, args, { req: { user } }) {
        if (user) {
          const userFound = await findUserById(user._id)
          return userFound
        }
      }
    }
  }
})
