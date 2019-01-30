import { GraphQLSchema } from 'graphql'
import { mutation } from '../mutations'
import { RootQueryType } from './root'

export const RootQuery = new GraphQLSchema({ query: RootQueryType, mutation })
