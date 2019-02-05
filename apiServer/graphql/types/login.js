

import { GraphQLObjectType, GraphQLString } from 'graphql'

export const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: { type: GraphQLString }
  }
})
