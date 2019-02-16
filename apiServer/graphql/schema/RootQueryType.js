import { GraphQLObjectType } from 'graphql'

import { userQuery } from '../queries/user'
import { betOptionsQueries } from '../queries/betOption'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQuery,
    ...betOptionsQueries
  }
})
