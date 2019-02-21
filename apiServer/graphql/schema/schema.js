import { GraphQLSchema } from 'graphql'
import { RootMutationType } from './RootMutationType'
import { RootQueryType } from './RootQueryType'

export const schema = new GraphQLSchema({ query: RootQueryType, mutation: RootMutationType })
