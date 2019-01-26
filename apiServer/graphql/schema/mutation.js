import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType } from './index'
import { User } from '../../database/models'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        monzouser: { type: new GraphQLNonNull(GraphQLString) }
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
        monzouser: { type: GraphQLString }
      },
      async resolve(parentValue, { id, ...rest }) {
        return User.findByIdAndUpdate({ _id: id }, rest)
          .then(() => User.findById({ _id: id }))
          .then()
      }
    }
  }
})
