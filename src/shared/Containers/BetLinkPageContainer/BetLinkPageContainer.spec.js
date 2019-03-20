import React from 'react'
import { shallow } from 'enzyme'

import { BetLinkPageContainer } from './BetLinkPageContainer'

const promiseMock = (newData) => jest.fn(() => new Promise(resolve => resolve(newData)))

const mockBetAdded = { data: { betAdded: 'mockBet' }}

const apolloClient = {
  query: promiseMock(mockBetAdded)
}

const mockHistory = { push: jest.fn() }

describe('given BetLinkPageContainer component', () => {
  describe('when trying to render the BetLinkPageContainer component', () => {
    it('should render the BetLinkPageContainer component', () => {
      const component = shallow(<BetLinkPageContainer client={apolloClient}/>)

      expect(component.length).toBe(1)
      expect(component.find('.BetLinkPage').length).toBe(1)
      expect(component.find('BetLinkPage').length).toBe(1)
    })
  })
  describe('when trying to get the betId from the local store', () => {
    describe('and betId is saved', () => {
      it('should save it in the state', async () => {
        const component = await shallow(<BetLinkPageContainer client={apolloClient}/>)

        const currentState = component.state()

        expect(currentState).toEqual({ betId: mockBetAdded.data.betAdded })
        expect(component.find('BetLinkPage').props().betId).toBe(currentState.betId)
      })
    })
    describe('and betId is saved', () => {
      it('should save it in the state', async () => {
        const newApolloClient = {
          query: new Error('no query')
        }
        let component
        try {
           component = await shallow(<BetLinkPageContainer client={newApolloClient} history={mockHistory}/>)
        } catch(e) {
          expect(mockHistory.push).toHaveBeenCalledWith('/')
        }

        expect(component.length).toBe(1)
      })
    })
  })
})
