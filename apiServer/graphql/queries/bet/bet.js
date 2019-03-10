import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { BetType } from '../../types'
import { findBetByUser } from '../../../database/queries/bet'

export const betQueries = {
  findBetByUser: {
    type: new GraphQLList(BetType),
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args) {
      const bet = await findBetByUser(args._id)

      return bet
    }
  }
}