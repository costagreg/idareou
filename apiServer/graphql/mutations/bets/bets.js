import { GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLList } from 'graphql'
import { BetType } from '../../types'
import { addBet, updateBetParticipant, updateBetWinners, findBet } from '../../../database/queries/bet'
import { addBetOption, updateOption } from '../../../database/queries/betOption'


export const betMutations = {
  addBet: {
    type: BetType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      currency: { type: GraphQLString },
      options: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(parentValue, args, { req: { user } }) {
      if (user) {
        const newBetOptions = await Promise.all(args.options.map(title => addBetOption({ title })))

        const bet = await addBet({ ...args, master: user._id, options: newBetOptions.map(opt => opt._id) })

        return bet
      }
    }
  },
  updateBetParticipant: {
    type: BetType,
    args: {
      betId: { type: new GraphQLNonNull(GraphQLString) },
      optionId: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args, { req: { user } }) {
      if (user) {
        await updateBetParticipant(args.betId, user._id, args.optionId)
        // TO-DO: Investigate if we can delete populate
        const betUpdated = await findBet(args.betId)
          .populate([
            { path: 'participants.user' },
            { path: 'participants.option' }
          ])

        return betUpdated
      }
    }
  },
  updateBetWinners: {
    type: BetType,
    args: {
      betId: { type: new GraphQLNonNull(GraphQLString) },
      optionId: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, { betId, optionId }, { req: { user } }) {
      if (user) {
        await updateOption(optionId, { isWinner: true })
        return updateBetWinners(betId)
      }
    }
  }
}
