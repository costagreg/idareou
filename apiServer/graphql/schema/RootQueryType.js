import { GraphQLObjectType } from 'graphql'

import { userQuery } from '../queries/user'
import { betOptionsQueries } from '../queries/betOption'
import { betQueries } from '../queries/bet'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQuery,
    ...betOptionsQueries,
    ...betQueries
  }
})
