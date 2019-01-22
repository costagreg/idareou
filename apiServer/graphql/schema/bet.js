import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { User } from '../../database/models'
import { UserType } from './user'


export const BetType = new GraphQLObjectType({
  name: 'Bet',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find({ _id: { $in: parentValue.users } }).then()
      }
    }
  }
})
