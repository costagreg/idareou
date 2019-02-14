import { GraphQLObjectType } from 'graphql'

import { userMutations } from '../mutations/users'
import { betOptionMutation } from '../mutations/betOption'

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...betOptionMutation
  }
})
