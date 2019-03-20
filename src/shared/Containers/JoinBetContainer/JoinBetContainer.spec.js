import React from 'react'
import { shallow } from 'enzyme'

import { JoinBetContainer } from './JoinBetContainer'
import { findBet } from '../../graphql/queries'
import { updateBetParticipant } from '../../graphql/mutations/betMutation'

const mockBet = {
  title: 'mockTitle',
  description: 'mockDescription',
  amount: 'mockAmount',
  partecipants: ['mockPartecipant'],
  options: [{ _id: 'mockId', title: 'mockTitle' }, { _id: 'mockId', title: 'mockTitle' }]
}
const initProps = {
  client: {
    mutate: jest.fn(() => ({ data: { updateBetPartecipants: mockBet } })),
    query: jest.fn(() => ({ data: { findBet: mockBet } }))
  },
  history: {
    push: jest.fn(() => { })
  },
  location: {}
}
const mockBetId = 'mockBetId'


describe('JoinBetContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('render', () => {
    it('should render the component without errors', () => {
      const component = shallow(<JoinBetContainer {...initProps} />)

      expect(component.exists()).toBe(true)
    })
    describe('when bet id has been found', () => {
      it('should show the JoinBetCard', () => {
        const component = shallow(<JoinBetContainer {...initProps} />)

        component.setState({ bet: mockBet })
        expect(component.find('JoinBetCard').props()).toEqual(mockBet)
      })
      it('should render all options as RadioBox', () => {
        const component = shallow(<JoinBetContainer {...initProps} />)

        component.setState({ bet: mockBet })
        expect(component.find('RadioBox').length).toBe(mockBet.options.length)
      })
      it('should render a submit button', () => {
        const component = shallow(<JoinBetContainer {...initProps} />)

        component.setState({ bet: mockBet })
        expect(component.find('Button').length).toBe(1)
      })
    })
    describe('when mounted', () => {
      it('pings the server to check the bet exits', () => {
        shallow(<JoinBetContainer {...initProps} betId={mockBetId} />)

        expect(initProps.client.query).toHaveBeenCalledTimes(1)
        expect(initProps.client.query).toHaveBeenCalledWith({ query: findBet, variables: { id: mockBetId } })
      })

      describe('if bet has been founded', () => {
        it('updates the state', async () => {
          const component = await shallow(<JoinBetContainer {...initProps} betId={mockBetId} />)

          expect(component.state()).toEqual({ bet: mockBet })
        })
      })
    })
    describe('@submitData', () => {
      it('fires mutation to update bet partecipants', () => {
        const mockFormData = { optionId: 'mockValue' }
        const component = shallow(<JoinBetContainer {...initProps} betId={mockBetId} />)

        component.instance().submitData(mockFormData)

        expect(initProps.client.mutate).toHaveBeenCalledTimes(1)
        expect(initProps.client.mutate).toHaveBeenCalledWith({
          mutation: updateBetParticipant,
          variables: {
            betId: mockBetId,
            optionId: mockFormData.optionId
          }
        })
      })
    })
  })
})
