import { graphql } from 'graphql'
import bcrypt from 'bcrypt'
import { schema } from '../../schema'
import { User } from '../../../database/models'

const loginMutation = `mutation Login($email: String!,$password: String!){
  login(email: $email, password: $password){
    token
  }
}`

const userData = {
  username: 'usernameMock',
  password: 'passwordMock',
  email: 'emailMock',
  monzouser: 'monzoUser'
}

describe('Login type', async () => {
  it('should be null when it doesnt exits', async () => {
    const variables = { email: 'mockEmail', password: 'mockPassword' }
    const result = await graphql(schema, loginMutation, {}, {}, variables)
    const { data: { login } } = result

    expect(login).toEqual(null)
  })

  it('should return the token if it exists', async () => {
    const passwordHash = await bcrypt.hashSync(userData.password, 10)
    const user = new User({ ...userData, password: passwordHash })
    await user.save()

    const variables = { email: userData.email, password: userData.password }
    const cookies = {}
    const context = {
      res: {
        cookie: (cookieName, value) => {
          cookies[cookieName] = value
        }
      }
    }
    const result = await graphql(schema, loginMutation, {}, context, variables)
    const { data: { login: { token } } } = result

    expect(cookies.token).toEqual(token)
  })
})
