import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { findUsers } from '../../database/queries/user'
import { UserType } from './user'


export const BetType = new GraphQLObjectType({
  name: 'Bet',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve({ users }) {
        return findUsers(users)
      }
    }
  }
})
