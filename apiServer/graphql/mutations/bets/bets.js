import { GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLList } from 'graphql'
import { BetType, BetOptionType } from '../../types'
import { addBet } from '../../../database/queries/bet'
import { addBetOption } from '../../../database/queries/betOption'

export const betMutations = {
  addBet: {
    type: BetType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: new GraphQLNonNull(GraphQLString) },
      currency: { type: new GraphQLNonNull(GraphQLFloat) },
      options: { type: new GraphQLList(BetOptionType) }
    },
    async resolve(parentValue, args) {
      const newBetOptions = await Promise.all(args.options.map(opt => addBetOption(opt)))
      console.log(newBetOptions)
      const bet = await addBet({ args, options: newBetOptions })

      return bet
    }
  }
}
