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
})
