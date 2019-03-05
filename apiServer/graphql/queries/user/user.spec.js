import { graphql } from 'graphql'
import { schema } from '../../schema'
import { User } from '../../../database/models'

describe('user queries', () => {
  describe('currentUser', () => {
    it('gets current user', async () => {
      const query = `
      {
        currentUser{
          _id
        }
      }`
      const userData = {
        username: 'myMockUsername',
        password: 'myMockPassword',
        email: 'myMockEmail',
        monzouser: 'myMonzoUser'
      }
      const user = new User(userData)
      await user.save()

      const result = await graphql(schema, query, {}, { req: { user: { _id: user._id.toString() } } })
      const { data: { currentUser } } = result

      expect(currentUser._id).toEqual(user._id.toString())
    })
  })

  describe('findUser', () => {
    it('gets a user', async () => {
      const query = `
      query FindUser($email: String!) {
        findUser(email: $email) {
          username
        }
      }`

      const userData = {
        username: 'myMockUsername',
        password: 'myMockPassword',
        email: 'costagregorioalessio@gmail.com',
        monzouser: 'myMonzoUser'
      }
      const user = new User(userData)
      await user.save()

      const result = await graphql(RootQuery, query, {}, {}, { email: 'costagregorioalessio@gmail.com' })
      // const { data: { findUser } } = result

      expect(result).toBe({})
    })
  })
})
