import { graphql } from 'graphql'
import { RootQuery } from '../../schema'
import { User } from '../../../database/models'

describe('user type', async () => {
  xit('should be null when it doesnt exits', async () => {
    const query = `
      {
        user(username: "test", password: "test") {
          username
        }
      }
    `
    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.user).toEqual([])
  })

  xit('should return the user if it exists', async () => {
    const userData = {
      username: 'myMockUsername',
      password: 'myMockPassword',
      email: 'myMockEmail',
      monzouser: 'myMonzoUser'
    }
    const user = new User(userData)
    await user.save()

    const query = `
      {
        user(username: "${userData.username}", password: "${userData.password}") {
          username,
          password,
          email,
          monzouser
        }
      }`
    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.user).not.toBe(null)
    expect(data.user[0].username).toEqual(userData.username)
    expect(data.user[0].password).toEqual(userData.password)
    expect(data.user[0].email).toEqual(userData.email)
    expect(data.user[0].monzouser).toEqual(userData.monzouser)
  })
})
