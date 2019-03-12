import React from 'react'
import { shallow } from 'enzyme'

import { addBet } from '~src/shared/graphql/mutations/betMutation'
import { currentBets } from '~src/shared/graphql/queries'
import { BetPageContainer } from './BetPageContainer'

jest.mock('~src/shared/graphql/mutations/betMutation', () => ({
  addBet: jest.fn()
}))


describe('BetPageContainer', () => {
  const mockApolloClient = {
    mutate: jest.fn(data => new Promise((resolve) => resolve(data)))
  }
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('renders', () => {
    it('renders a form', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('FormContainer').length).toBe(1)
    })
    it('renders a textinput for title', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('TextInput[name="title"]').length).toBe(1)
    })
    it('renders a textarea for description', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('TextArea[name="description"]').length).toBe(1)
    })
    it('renders an amountInput for amount', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('AmountInput[name="amount"]').length).toBe(1)
    })
    it('renders as textinput with option name as options are in the state', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('TextInput[placeholder="Write your option"]').length).toBe(component.state().options.length)
    })
    it('renders a button for submit', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('Button').length).toBe(1)
    })
  })
  describe('@Methods', () => {
    describe('createBet', () => {
      describe('when createBet is called', () => {
        const formData = {
          title: 'mockTitle',
          description: 'mockDescription',
          amount: '4.00'
        }
        it('apollo client should be called with addBet mutation and right variables', async () => {
          const variableExpected = {
            ...formData,
            options: [],
            amount: parseFloat(formData.amount)
          }
          const component = shallow(<BetPageContainer client={mockApolloClient}/>)

          const newIsntance = component.instance()

          newIsntance.optionTransformer = jest.fn(() => variableExpected.options)

          expect(newIsntance.optionTransformer).not.toHaveBeenCalled()

          await newIsntance.createBet(formData)

          expect(newIsntance.optionTransformer).toHaveBeenCalled()
          expect(mockApolloClient.mutate).toHaveBeenCalledWith({
            mutation: addBet,
            variables: { ...formData, options: [], amount: parseFloat(formData.amount) },
            refetchQueries: [{ query: currentBets }]
          })
        })
      })
    })
    describe('optionTransformer', () => {
      describe('when optionTransformer is called', () => {
        describe('and options are passed', () => {
          it('should return an array with all the options provided', () => {
            const formData = {
              title: 'mockTitle',
              option1: 'first',
              option2: 'second'
            }

            const component = shallow(<BetPageContainer />)

            const newIsntance = component.instance()

            expect(newIsntance.optionTransformer(formData)).toEqual(['first', 'second'])
          })
        })
      })
    })
  })
})
