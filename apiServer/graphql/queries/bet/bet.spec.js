import { graphql } from 'graphql'
import { schema } from '../../schema'

import createBetHelper from '../../../helpers/tests/createBet'

describe('Bet queries', () => {
  describe('currentBets', () => {
    it('returns all bets involved with the current user', async () => {
      const betHelper = await createBetHelper(3)
      const context = { req: { user: { _id: betHelper.users[2]._id.toString() } } }

      const query = `
      {
        currentBets{
          _id
        }
      }`
      const result = await graphql(schema, query, {}, context)
      const { data: { currentBets } } = result

      expect(currentBets[0]._id).toEqual(betHelper.bet._id.toString())
    })
  })
  describe('findBet', () => {
    it('returns the bet searched', async () => {
      const betHelper = await createBetHelper(3)
      const context = { req: { user: {} } }
      const paramas = { id: betHelper.bet._id.toString() }
      const query = `
        query FindBet($id: String!){
          findBet(id: $id){
            _id
          }
        }`
      const result = await graphql(schema, query, {}, context, paramas)
      console.log(result)
      const { data: { findBet } } = result
      expect(findBet._id.toString()).toEqual(betHelper.bet._id.toString())
    })
  })
})
