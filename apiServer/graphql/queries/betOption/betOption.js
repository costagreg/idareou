import { GraphQLString, GraphQLNonNull } from 'graphql'
import { BetOptionType } from '../../types'
import { findBetOption } from '../../../database/queries/betOption'

export const betOptionsQueries = {
  findBetOption: {
    type: BetOptionType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args) {
      const betOption = await findBetOption(args._id)

      return betOption
    }
  }
}
