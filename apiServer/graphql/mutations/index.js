import jwt from 'jsonwebtoken'
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType, LoginType } from '../types'
import { addUser, deleteUser, updateUser, findUser } from '../../database/queries/user'

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
    },
    login: {
      type: LoginType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      async resolve(parentValue, args, context) {
        const userFound = await findUser(args)
        if (userFound && userFound.length > 0) {
          const { _id, email } = userFound[0]
          const token = jwt.sign({
            _id,
            email
          }, process.env.JWT_SECRET, { expiresIn: '1d' })
          context.res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 26
          })
          return { token }
        }
      }
    }
  }
})
