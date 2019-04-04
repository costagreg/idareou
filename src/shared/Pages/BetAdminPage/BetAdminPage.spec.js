import React from 'react'
import { shallow } from 'enzyme'

import BetAdminPage from './BetAdminPage'

const initProps = {
  match: {
    params: {
      id: 'mockId'
    }
  }
}

describe('given BetAdminPage component', () => {
  const mockBetId = 'betId'
  describe('when trying to render the BetAdminPage component', () => {
    const component = shallow(<BetAdminPage betId={mockBetId} {...initProps} />)
    it('should render BetAdminPageContainer', () => {
      console.log(component.debug())
      expect(component.find('Apollo(BetAdminPageContainer)').length).toBe(1)
    })
    it('should render the BetAdminPage title', () => {
      expect(component.find('PageTitle').length).toBe(1)
    })
  })
})
