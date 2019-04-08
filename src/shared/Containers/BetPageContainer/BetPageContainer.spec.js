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
    mutate: jest.fn(() => new Promise((resolve) => resolve({ data: { addBet: { _id: 'id' } } }))),
    writeData: jest.fn(data => new Promise(resolve => resolve(data)))
  }
  afterEach(() => {
    jest.clearAllMocks()
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
        it('mutation should be called with addBet mutation and right variables and saveAndRedirect should be called with the newBet id', async () => {
          const variableExpected = {
            ...formData,
            options: [],
            amount: parseFloat(formData.amount)
          }
          const component = shallow(<BetPageContainer client={mockApolloClient}/>)

          const newInstance = component.instance()

          newInstance.optionTransformer = jest.fn(() => variableExpected.options)
          newInstance.saveAndRedirect = jest.fn(() => new Promise(resolve => resolve()))

          expect(newInstance.optionTransformer).not.toHaveBeenCalled()
          expect(newInstance.saveAndRedirect).not.toHaveBeenCalled()

          await newInstance.createBet(formData)

          expect(newInstance.optionTransformer).toHaveBeenCalled()
          expect(mockApolloClient.mutate).toHaveBeenCalledWith({
            mutation: addBet,
            variables: { ...formData, options: [], amount: parseFloat(formData.amount) },
            refetchQueries: [{ query: currentBets }]
          })
          expect(newInstance.saveAndRedirect).toHaveBeenCalled()
        })
      })
    })
    describe('saveAndRedirect', () => {
      it('should save id to the local store and redirect the user to dinamyc url', async () => {
        const mockId = '123456'
        const mockHistory = { push: jest.fn() }

        const component = shallow(<BetPageContainer client={mockApolloClient} history={mockHistory} />)
        const newInstance = component.instance()

        await newInstance.saveAndRedirect(mockId)

        expect(mockApolloClient.writeData).toHaveBeenCalledWith({ data: { betAdded: mockId } })
        expect(mockHistory.push).toHaveBeenCalledWith(`/sharelink/${mockId}`)
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

            const newInstance = component.instance()

            expect(newInstance.optionTransformer(formData)).toEqual(['first', 'second'])
          })
        })
      })
    })
  })
})
