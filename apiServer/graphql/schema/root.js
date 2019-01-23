import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType, BetType } from './index'
import { User, Bet } from '../../database/models'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString } }, // if you give me an username I will give you a user
      resolve(parentValue, { username }) {
        return User.find({ username }).then()
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return Bet.findById(id).then()
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        monzoUser: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return User.create(args).then()
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { id }) {
        const user = await User.findById(id)
        await user.remove().then()
        return user
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        monzoUser: { type: GraphQLString }
      },
      async resolve(parentValue, { id, ...rest }) {
        return User.findByIdAndUpdate({ _id: id }, rest)
          .then(() => User.findById({ _id: id }))
          .then()
      }
    }
  }
})

export const RootQuery = new GraphQLSchema({ query: RootQueryType, mutation })
