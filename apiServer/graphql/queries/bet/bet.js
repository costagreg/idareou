import { GraphQLString, GraphQLNonNull } from 'graphql'
import { BetType } from '../../types'
import { findBet } from '../../../database/queries/bet'

export const betQueries = {
  findBetByUser = {
    type: BetOptionType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args) {
      const bet = await findBet(args._id)

      return bet
    }
  }
}