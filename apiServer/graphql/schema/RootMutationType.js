import { GraphQLObjectType } from 'graphql'

import { userMutations } from '../mutations/users'
import { betOptionMutation } from '../mutations/betOption'
import { betMutations } from '../mutations/bets'


export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...betOptionMutation,
    ...betMutations
  }
})
