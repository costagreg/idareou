import { graphql } from 'graphql'
import bcrypt from 'bcrypt'
import { schema } from '../../schema'
import { User } from '../../../database/models'

const context = {
  res: {
    cookie: () => { }
  }
}

const userData = {
  username: 'usernameMock',
  password: 'passwordMock',
  email: 'emailMock',
  monzouser: 'monzoUser'
}

describe('Users mutation', () => {
  describe('addUser', () => {
    it('adds a new user', async () => {
      const addUserMutation = `
        mutation AddUser($username: String!,$password: String!,$email: String!,$monzouser: String!){
          addUser(username: $username, password: $password, email: $email, monzouser: $monzouser){
            _id
            username
          }
        }
      `
      const result = await graphql(schema, addUserMutation, {}, context, userData)
      const { data: { addUser } } = result

      expect(addUser._id).not.toBe(null)
      expect(addUser.username).toBe(userData.username)
    })
  })

  describe('deleteUser', () => {
    it('delete a user', async () => {
      const deleteUserMutation = `
        mutation DeleteUser($id: String!){
          deleteUser(id: $id){
            _id
          }
        }`
      const user = new User(userData)
      await user.save()

      const result = await graphql(schema, deleteUserMutation, {}, context, { id: user._id.toString() })
      const { data: { deleteUser } } = result
      const foundUser = await User.findById(user._id)

      expect(foundUser).toEqual(null)
      expect(deleteUser._id).toEqual(user._id.toString())
    })
  })

  describe('updateUser', () => {
    it('update a user', async () => {
      const updateUserMutation = `
        mutation UpdateUser($id: String!, $username: String!, $password: String!, $email: String!, $monzouser: String!){
          updateUser(id: $id, username: $username, password: $password, email: $email, monzouser: $monzouser){
            _id
          }
        }
      `
      const newVariables = {
        username: 'usernameMockNew',
        password: 'passwordMockNew',
        email: 'emailMockNew',
        monzouser: 'monzoUserNew'
      }

      const user = new User(userData)
      await user.save()
      const result = await graphql(schema, updateUserMutation, {}, context, { id: user._id.toString(), ...newVariables })
      const foundUser = await User.findById(user._id)

      expect(result).not.toEqual(null)
      expect(foundUser._id).toEqual(user._id)
      expect(foundUser.username).toEqual(newVariables.username)
      expect(foundUser.password).toEqual(newVariables.password)
      expect(foundUser.email).toEqual(newVariables.email)
      expect(foundUser.monzouser).toEqual(newVariables.monzouser)
    })
  })

  describe('loginUser', () => {
    it('should return the token if it exists', async () => {
      const loginMutation = `mutation Login($email: String!,$password: String!){
        login(email: $email, password: $password){
          token
        }
      }`
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
})
