import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType } from '../types'
import { User, Bet } from '../../database/models'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { nickname: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve(parentValue, { nickname, password }) {
        return User.find({ nickname, password }).then()
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {},
      resolve() {
        return User.find({}).then()
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
