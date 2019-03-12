import { graphql } from 'graphql'
import { schema } from '../../schema'

import { BetOption } from '../../../database/models'

describe('betOption queries', () => {
  describe('findBetOption', () => {
    describe('when the id is passed', () => {
      it('should return the betoption', async () => {
        const context = {}
        const newBetOption = await BetOption.create({ title: 'mockTitle' })

        const query = `
        {
          findBetOptions(ids: ["${newBetOption._id.toString()}"]){
            _id
          }
        }`

        const result = await graphql(schema, query, {}, context)

        const { data: { findBetOptions } } = result

        expect(findBetOptions[0]._id).toEqual(newBetOption._id.toString())
      })
    })
  })
})
