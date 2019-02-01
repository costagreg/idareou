import { User } from '../models'
import { addUser, findUser, updateUser, deleteUser, findUsers } from './user'

describe('User queries', () => {
  describe('addUser', () => {
    it('adds a new user', async () => {
      const props = {
        username: 'mockUsername',
        password: 'mockPassword',
        email: 'mockEmail',
        monzouser: 'mockMonzouser'
      }
      const user = await addUser(props)
      const userFound = await User.findById(user.id)

      expect(userFound.username).toEqual(props.username)
      expect(userFound.password).toEqual(props.password)
      expect(userFound.email).toEqual(props.email)
      expect(userFound.monzouser).toEqual(props.monzouser)
    })
  })

  describe('findUser', () => {
    it('finds a user', async () => {
      const props = {
        username: 'mockUsername',
        password: 'mockPassword',
        email: 'mockEmail',
        monzouser: 'mockMonzouser'
      }
      await addUser(props)
      const userFound = await findUser({ username: 'mockUsername' })

      expect(userFound[0].username).toEqual(props.username)
      expect(userFound[0].password).toEqual(props.password)
      expect(userFound[0].email).toEqual(props.email)
      expect(userFound[0].monzouser).toEqual(props.monzouser)
    })
  })

  describe('updateUser', () => {
    it('updates a user', async () => {
      const props = {
        username: 'mockUsername',
        password: 'mockPassword',
        email: 'mockEmail',
        monzouser: 'mockMonzouser'
      }

      const user = await addUser(props)
      await updateUser(user.id, { ...props, username: 'mockUsername2' })
      const userFound = await User.findById(user.id)

      expect(userFound.username).toEqual('mockUsername2')
      expect(userFound.password).toEqual(props.password)
      expect(userFound.email).toEqual(props.email)
      expect(userFound.monzouser).toEqual(props.monzouser)
    })
  })

  describe('deleteUser', () => {
    it('delete a user', async () => {
      const props = {
        username: 'mockUsername',
        password: 'mockPassword',
        email: 'mockEmail',
        monzouser: 'mockMonzouser'
      }

      const user = await addUser(props)
      await deleteUser(user.id)
      const userFound = await User.findById(user.id)

      expect(userFound).toBe(null)
    })
  })

  describe('findUsers', () => {
    it('finds a list of users providing the ids', async () => {
      const props = {
        username: 'mockUsername',
        password: 'mockPassword',
        email: 'mockEmail',
        monzouser: 'mockMonzouser'
      }

      const user1 = await addUser(props)
      const user2 = await addUser(props)

      const userFound = await findUsers([user1.id, user2.id])

      expect(userFound[0]).not.toBe(null)
      expect(userFound[1]).not.toBe(null)
      expect(userFound[0].id).toBe(user1.id)
      expect(userFound[1].id).toBe(user2.id)
    })
  })
})
