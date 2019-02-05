import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType } from '../types'
import { addUser, deleteUser, updateUser } from '../../database/queries/user'

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
        return addUser(args)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return deleteUser(id)
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
      resolve(parentValue, { id, ...newData }) {
        return updateUser(id, { ...newData })
      }
    }
  }
})
