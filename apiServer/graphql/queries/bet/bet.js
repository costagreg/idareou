import { GraphQLList } from 'graphql'
import { BetType } from '../../types'
import { findBetByUser } from '../../../database/queries/bet'

export const betQueries = {
  currentBets: {
    type: new GraphQLList(BetType),
    async resolve(parentValue, args, { req: { user } }) {
      if (user) {
        const bet = await findBetByUser(user._id)
        return bet
      }
    }
  }
}
