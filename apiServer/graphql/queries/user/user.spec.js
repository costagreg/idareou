import { graphql } from 'graphql'
import { schema } from '../../schema'
import { User } from '../../../database/models'

describe('user queries', () => {
  describe('currentUser', () => {
    it('get current user', async () => {
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
})
