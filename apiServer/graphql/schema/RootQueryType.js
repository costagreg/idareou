import { GraphQLObjectType } from 'graphql'

import { userQuery } from '../queries/user'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQuery
  }
})
