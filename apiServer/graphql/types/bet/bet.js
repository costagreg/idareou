import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql'
import { UserType } from '../user'
import { BetOptionType } from '../betOption'

const participantType = new GraphQLObjectType({
  name: 'participant',
  fields: {
    user: { type: UserType },
    option: { type: BetOptionType }
  }
})

export default new GraphQLObjectType({
  name: 'Bet',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    currency: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    master: { type: GraphQLString },
    participants: { type: new GraphQLList(participantType) }
  }
})
