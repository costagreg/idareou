import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql'
import { User as UserMongoose  } from '../../database/models/user'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  }
})

// this define a query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString } }, // if you give me an username I will give you a user
      async resolve(parentValue, args) {
        const data = await UserMongoose.find({ username: args.username }).then((users) => users)
        return data
      }
    }
  }
})

export const User = new GraphQLSchema({ query: RootQuery })
