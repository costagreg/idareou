import React from 'react'
import { shallow } from 'enzyme'

import { BetAdminPageContainer } from './BetAdminPageContainer'

const mockBet = {
  title: 'mockTitle',
  description: 'mockDescription',
  amount: 'mockAmount',
  partecipants: ['mockPartecipant'],
  options: [{ _id: 'mockId', title: 'mockTitle' }, { _id: 'mockId', title: 'mockTitle' }]
}

const initProps = {
  data: { findBet: mockBet }
}

describe('BetAdminPageContainer', () => {
  it('renders without errors', () => {
    const component = shallow(<BetAdminPageContainer {...initProps } />)

    expect(component).toMatchSnapshot()
  })
  it('renders BetAdminCard', () => {
    const component = shallow(<BetAdminPageContainer {...initProps } />)

    expect(component.find('BetAdminCard').props()).toEqual(mockBet)
  })
})
