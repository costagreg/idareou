import jwt from 'jsonwebtoken'
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType, LoginType } from '../types'
import { addUser, deleteUser, updateUser, findUser } from '../../database/queries/user'

function attachToken(data, context) {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
  context.res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 26,
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: false,
    secure: false
  })
  return token
}

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
      async resolve(parentValue, args, context) {
        const user = await addUser(args)
        const { _id, email } = user
        attachToken({ _id, email }, context)
        return user
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
          const token = attachToken({ _id, email }, context)
          return { token }
        }
      }
    }
  }
})
