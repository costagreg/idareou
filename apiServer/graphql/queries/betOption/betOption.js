import { GraphQLString, GraphQLList } from 'graphql'
import { BetOptionType } from '../../types'
import { findBetOptions } from '../../../database/queries/betOption'

export const betOptionsQueries = {
  findBetOptions: {
    type: new GraphQLList(BetOptionType),
    args: {
      ids: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(parentValue, { ids }) {
      return findBetOptions(ids)
    }
  }
}
