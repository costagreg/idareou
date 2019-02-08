import { GraphQLObjectType, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'Login',
  fields: {
    token: { type: GraphQLString }
  }
})
