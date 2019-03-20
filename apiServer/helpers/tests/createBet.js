import { Bet, User } from '../../database/models'

const createUser = (username) => (
  User.create({ username })
)

const createBetHelper = async (usersNum = 2) => {
  if (usersNum < 2) throw new Error('You need at least 2 users')

  const usersArray = Array(usersNum).fill('')
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
