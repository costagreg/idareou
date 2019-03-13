import { Bet, User } from '../../database/models'

const createUser = (username) => (
  User.create({ username })
)

const createBetHelper = async (numUsers = 2) => {
  if (numUsers < 2) throw new Error('You need at least 2 users')

  const usersArray = Array(numUsers).fill('')
  const users = await Promise.all(usersArray.map((x, index) => createUser('nickname' + index)))

  const participants = users.map((value) => ({ user: value._id }))

  const bet = await Bet.create({
    title: 'title',
    description: 'description',
    amount: 10.00,
    currency: '$',
    master: users[0]._id,
    participants
  })

  return { users, bet }
}

export default createBetHelper
