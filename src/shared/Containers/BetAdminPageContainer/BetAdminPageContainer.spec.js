import React from 'react'
import { shallow } from 'enzyme'

import { BetAdminPageContainer } from './BetAdminPageContainer'

describe('BetAdminPageContainer', () => {
  it('renders without errors', () => {
    const component = shallow(<BetAdminPageContainer />)

    expect(component).toMatchSnapshot()
  })
})
