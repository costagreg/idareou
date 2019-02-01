import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType } from '../types'
import { findUser, allUsers } from '../../database/queries/user'
import { findBet } from '../../database/queries/bet'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve(parentValue, { username, password }) {
        return findUser(username, password)
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {},
      resolve() {
        return allUsers()
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return findBet(id)
      }
    }
  }
})
