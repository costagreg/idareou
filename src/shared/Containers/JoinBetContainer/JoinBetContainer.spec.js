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
    mutate: jest.fn(() => ({ data: { updateBetPartecipants: mockBet } }))
  },
  history: {
    push: jest.fn(() => { })
  },
  location: {},
  data: { findBet: mockBet }
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
      describe('and the bet hasn t been found', () => {
        it('we redirect to homepage', async () => {
          const mockRedirectHomepage = jest.fn()
          const component = shallow(<JoinBetContainer {...initProps} data={{ findBet: null }} betId={mockBetId} />)

          component.instance().redirectToHomePage = mockRedirectHomepage
          component.instance().componentDidMount()

          expect(mockRedirectHomepage).toHaveBeenCalledTimes(1)
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
