import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType } from '../types'
import { addUser, deleteUser, updateUser } from '../../database/queries'

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
      resolve(parentValue, { username, password, email, monzouser }) {
        return addUser(username, password, email, monzouser)
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
      async resolve(parentValue, { id, username, password, email, monzouser }) {
        return updateUser(id, username, password, email, monzouser)
      }
    }
  }
})
