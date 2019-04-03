import React from 'react'
import { shallow } from 'enzyme'

import BetAdminCard from './BetAdminCard'

describe('BetAdminCard', () => {
  it('renders without errors', () => {
    const component = shallow(<BetAdminCard />)

    expect(component).toMatchSnapshot()
  })
})
