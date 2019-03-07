import { graphql } from 'graphql'
import { schema } from '../../schema'

describe('betOption mutations', () => {
  describe('addBetOption', () => {
    describe('when trying to add a betOption', () => {
      it('should add it into the db', async () => {
        const context = {}

        const variables = { title: 'newOpt' }

        const addBetOptionMutation = `
          mutation AddBetOption($title: String!) {
            addBetOption(title: $title) {
              title
            }
          }`

        const result = await graphql(schema, addBetOptionMutation, {}, context, variables)
        const { data: { addBetOption } } = result

        expect(addBetOption.title).toBe(variables.title)
      })
    })
  })
})
