import { GraphQLString, GraphQLNonNull } from 'graphql'
import bcrypt from 'bcrypt'

import { UserType, LoginType } from '../../types'
import { addUser, deleteUser, updateUser, findUser } from '../../../database/queries/user'
import { attachTokenToResp } from '../../../helpers/jwt'
import { ValidationError } from '../../../helpers/ValidationError'

export const userMutations = {
  addUser: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      monzouser: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, args, context) {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const errors = []

      const usernameFound = await findUser({ username: args.username })
      const emailFound = await findUser({ email: args.email })

      if (usernameFound.length > 0) {
        errors.push({ key: 'username', message: 'Username already in use' })
      }

      if (emailFound.length > 0) {
        errors.push({ key: 'email', message: 'Email already in use' })
      }

      if (errors.length > 0) throw new ValidationError(errors)

      const user = await addUser({ ...args, password: passwordHash })
      const { _id, email } = user

      attachTokenToResp({ _id, email }, context)
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
    async resolve(parentValue, { email: userEmail, password: userPassword }, context) {
      const userFound = await findUser({ email: userEmail })
      if (userFound.length > 0) {
        const { _id, email, password } = userFound[0]
        const isValidPassword = await bcrypt.compareSync(userPassword, password)
        if (isValidPassword) {
          const token = attachTokenToResp({ _id, email }, context)
          return { token }
        }
      }
    }
  }
}
