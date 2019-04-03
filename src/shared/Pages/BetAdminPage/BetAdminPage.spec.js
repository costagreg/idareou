import React from 'react'
import { shallow } from 'enzyme'

import BetAdminPage from './BetAdminPage'

describe('given BetAdminPage component', () => {
  const mockBetId = 'betId'
  describe('when trying to render the BetAdminPage component', () => {
    const component = shallow(<BetAdminPage betId={mockBetId}/>)
    it('should render the BetAdminPageContainer', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetAdminPage title', () => {
      expect(component.find('PageTitle').length).toBe(1)
    })
  })
})
