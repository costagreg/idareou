import { GraphQLObjectType, GraphQLString } from 'graphql'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    monzoUser: { type: GraphQLString }
  }
})
