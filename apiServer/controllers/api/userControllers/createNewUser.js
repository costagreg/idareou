import { createUserInstance } from './createUserInstance'

export const createNewUser = async (_, res) => {
  try {
      const userInstance = createUserInstance({
        password: 'test1',
      })

      return res.send(await userInstance.save())
  } catch (err) {
    console.log('ERROR STATUS>>>>>>', err.message)
    return res.status(500).send(err.message)
  }
}
