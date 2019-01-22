import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql'
import { UserType } from './user'


export const BetType = new GraphQLObjectType({
  name: 'Bet',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    users: { 
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {

      }
    }

  }
})


// // this define a query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: BetType,
      args: { id: { type: GraphQLString } }, // if you give me an username I will give you a user
      resolve(parentValue, args) {

      }
    }
  }
})

export const Bet = new GraphQLSchema({ query: RootQuery })
