import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { findUsers } from '../../../database/queries/user'
import { UserType } from '../index'

export default new GraphQLObjectType({
  name: 'Bet',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    currency: { type: GraphQLString },
    // options: { type: new GraphQLList() },
    participants: {
      type: new GraphQLList(UserType),
      resolve({ users }) {
        return findUsers(users)
      }
    }
  }
})
