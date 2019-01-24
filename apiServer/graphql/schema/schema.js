import { GraphQLSchema } from 'graphql'
import { mutation } from './mutation'
import { RootQueryType } from './root'

export const RootQuery = new GraphQLSchema({ query: RootQueryType, mutation })
