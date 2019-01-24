import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType } from './index'
import { User, Bet } from '../../database/models'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // if you give me an username I will give you a user
      resolve(parentValue, { id }) {
        return User.findById({ id }).then()
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: { }, // if you give me an username I will give you a user
      resolve() {
        return User.find({ }).then()
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return Bet.findById(id).then()
      }
    }
  }
})
