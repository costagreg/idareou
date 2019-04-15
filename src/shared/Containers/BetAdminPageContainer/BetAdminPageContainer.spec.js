import React from 'react'
import { shallow } from 'enzyme'

import { BetAdminPageContainer } from './BetAdminPageContainer'
import { updateBetWinners } from '~src/shared/graphql/queries'

const mockBet = {
  title: 'mockTitle',
  description: 'mockDescription',
  amount: 'mockAmount',
  partecipants: ['mockPartecipant'],
  options: [{ _id: 'mockId', title: 'mockTitle' }, { _id: 'mockId', title: 'mockTitle' }]
}

const initProps = {
  data: { findBet: mockBet },
  betId: 'mockBetId',
  client: {
    mutate: jest.fn(() => new Promise((resolve) => resolve({ data: { updateBetWinners: { _id: 'id' } } })))
  },
  history: {
    push: jest.fn()
  }
}
describe('BetAdminPageContainer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const component = shallow(<BetAdminPageContainer {...initProps} />)

    expect(component.length).toBe(1)
  })
  it('renders BetAdminCard', () => {
    const component = shallow(<BetAdminPageContainer {...initProps} />)

    expect(component.find('BetCard').props()).toEqual(mockBet)
  })
  it('renders a FormContainer', () => {
    const component = shallow(<BetAdminPageContainer {...initProps} />)

    expect(component.find('FormContainer').exists()).toEqual(true)
  })
  it('renders all options for that bet', () => {
    const component = shallow(<BetAdminPageContainer {...initProps} />)

    expect(component.find('RadioBox').length).toEqual(2)
    expect(component.find('RadioBox').at(0).prop('text')).toEqual(mockBet.options[0].title)
    expect(component.find('RadioBox').at(1).prop('text')).toEqual(mockBet.options[1].title)
  })
  describe('submitData', () => {
    it('it should fire updateBetWinners query', () => {
      const component = shallow(<BetAdminPageContainer {...initProps} />)
      const mockOptionId = 'mockOptionId'

      component.instance().submitData({ optionId: mockOptionId })

      expect(initProps.client.mutate).toBeCalledWith({ mutation: updateBetWinners, variables: { optionId: mockOptionId, betId: initProps.betId } })
    })
    describe('if updateBetWinners mutation is successful', () => {
      it('should redirect to dashboard', async () => {
        const component = shallow(<BetAdminPageContainer {...initProps} />)
        const mockOptionId = 'mockOptionId'

        await component.instance().submitData({ optionId: mockOptionId })

        expect(initProps.history.push).toBeCalledWith('/dashboard')
      })
    })
  })
})
