import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql'
import { UserType, BetType, LoginType } from '../types'
import { findUser, findUserById } from '../../database/queries/user'
import { findBet } from '../../database/queries/bet'

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: GraphQLList(UserType),
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve(parentValue, args) {
        return findUser(args)
      }
    },
    bet: {
      type: BetType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return findBet(id)
      }
    },
    me: {
      type: UserType,
      async resolve(parentValue, args, auth) {
        if (auth.user) {
          const userFound = await findUserById(auth.user._id)
          return userFound
        }
      }
    },
    login: {
      type: LoginType,
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const userFound = await findUser(args)
        if (userFound) {
          const { _id, email } = userFound[0]
          const token = jwt.sign({
            _id,
            email
          }, process.env.JWT_SECRET, { expiresIn: '1d' })
          return { token }
        }
      }
    }
  }
})
