import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql'
import { UserType } from '../user'
import { BetOptionType } from '../betOption'
import { findBetOption } from '../../../database/queries/betOption'

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
    options: {
      type: new GraphQLList(BetOptionType),
      resolve: async (parentValue) => {
        const options = await findBetOption(parentValue.options[0])

        return [options]
      }
    },
    master: { type: GraphQLString },
    participants: { type: new GraphQLList(participantType) }
  }
})
