import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

export default new GraphQLObjectType({
  name: 'Betoption',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    isWinner: { type: GraphQLBoolean }
  }
})
