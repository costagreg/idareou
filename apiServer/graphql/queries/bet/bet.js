import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { BetType } from '../../types'
import { findBetByUser, findBet } from '../../../database/queries/bet'

export const betQueries = {
  currentBets: {
    type: new GraphQLList(BetType),
    async resolve(parentValue, args, { req: { user } }) {
      if (user) {
        return findBetByUser(user._id)
      }
    }
  },
  findBet: {
    type: BetType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args, { req: { user } }) {
      if (user) {
        console.log(findBet(args.id))
        return findBet(args.id)
      }
    }
  }
}
