import { User } from '../../models'
import { addUser, findUser, updateUser, deleteUser, findUsers } from './user'

describe('User queries', () => {
  const userData = {
    username: 'mockUsername',
    password: 'mockPassword',
    email: 'mockEmail',
    monzouser: 'mockMonzouser'
  }
  describe('addUser', () => {
    it('adds a new user', async () => {
      const user = await addUser(userData)
      const userFound = await User.findById(user.id)

      expect(userFound.username).toEqual(userData.username)
      expect(userFound.password).toEqual(userData.password)
      expect(userFound.email).toEqual(userData.email)
      expect(userFound.monzouser).toEqual(userData.monzouser)
    })
  })

  describe('findUser', () => {
    it('finds a user', async () => {
      await addUser(userData)
      const userFound = await findUser({ username: 'mockUsername' })

      expect(userFound[0].username).toEqual(userData.username)
      expect(userFound[0].password).toEqual(userData.password)
      expect(userFound[0].email).toEqual(userData.email)
      expect(userFound[0].monzouser).toEqual(userData.monzouser)
    })
  })

  describe('updateUser', () => {
    it('updates a user', async () => {
      const user = await addUser(userData)
      await updateUser(user.id, { ...userData, username: 'mockUsername2' })
      const userFound = await User.findById(user.id)

      expect(userFound.username).toEqual('mockUsername2')
      expect(userFound.password).toEqual(userData.password)
      expect(userFound.email).toEqual(userData.email)
      expect(userFound.monzouser).toEqual(userData.monzouser)
    })
  })

  describe('deleteUser', () => {
    it('delete a user', async () => {
      const user = await addUser(userData)
      await deleteUser(user.id)
      const userFound = await User.findById(user.id)

      expect(userFound).toBe(null)
    })
  })

  describe('findUsers', () => {
    it('finds a list of users providing the ids', async () => {
      const user1 = await addUser(userData)
      const user2 = await addUser(userData)

      const userFound = await findUsers([user1.id, user2.id])

      expect(userFound[0]).not.toBe(null)
      expect(userFound[1]).not.toBe(null)
      expect(userFound[0].id).toBe(user1.id)
      expect(userFound[1].id).toBe(user2.id)
    })
  })
})
