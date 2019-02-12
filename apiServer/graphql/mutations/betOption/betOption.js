import { GraphQLString, GraphQLNonNull } from 'graphql'
import { BetOptionType } from '../../types'
import { addBetOption } from '../../../database/queries/betOption'

export const betOptionMutation = {
  addBetOption: {
    type: BetOptionType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args) {
      const betOption = await addBetOption(args)

      return betOption
    }
  }
}
