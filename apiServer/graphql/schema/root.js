import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType } from './index'
import { User, Bet } from '../../database/models'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString } }, // if you give me an username I will give you a user
      resolve(parentValue, args) {
        return User.find({ username: args.username }).then()
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return Bet.findById(args.id).then()
      }
    }
  }
})

export const RootQuery = new GraphQLSchema({ query: RootQueryType })
