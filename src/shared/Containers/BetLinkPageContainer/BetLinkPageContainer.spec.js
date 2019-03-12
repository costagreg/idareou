import React from 'react'
import { shallow } from 'enzyme'

import BetLinkPageContainer from './BetLinkPageContainer'

describe('given BetLinkPageContainer component', () => {
  describe('when trying to render the BetLinkPageContainer component', () => {
    it('should render the BetLinkPageContainer component', () => {
      const component = shallow(<BetLinkPageContainer />)

      expect(component.length).toBe(1)
    })
  })
})
