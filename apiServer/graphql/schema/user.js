import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import _ from 'lodash'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  }
})

const users = [
  {
    username: 'cozzobello1992',
    password: 'asdassd',
    email: 'costagregorioalessio@gmail.com'
  },
  {
    username: 'cozzobello',
    password: 'asdssss',
    email: 'costagregorioalessio@gmail.com'
  },
  {
    username: 'cozzo',
    password: 'asdasdasddsassd',
    email: 'costagregorioalessio@gmail.com'
  }
]

// this define a query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { username: { type: GraphQLString } }, // if you give me an username I will give you a user
      resolve(parentValue, args) {
        // here search in mongodb
        return _.find(users, { username: args.username })
      }
    }
  }
})

export const User = new GraphQLSchema({ query: RootQuery })
