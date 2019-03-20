import React from 'react'
import { shallow } from 'enzyme'

import BetLinkPage from './BetLinkPage'

describe('given BetLinkPage component', () => {
  const mockBetId = 'betId'
  describe('when trying to render the BetLinkPage component', () => {
    const component = shallow(<BetLinkPage betId={mockBetId}/>)
    it('should render the BetLinkPageContainer', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetLinkPage title', () => {
      expect(component.find('PageTitle').length).toBe(1)
    })
    it('should render the BetLinkPage__button', () => {
      const button = component.find('.BetLinkPage__button')

      expect(button.length).toBe(1)
      expect(button.prop('to')).toBe('/dashboard')
    })
    it('should render the BetLinkPage__link with betId', () => {
      const link = component.find('.BetLinkPage__link')

      expect(link.length).toBe(1)
      expect(link.text()).toBe(`${process.env.HOST}/invite/${mockBetId}`)
    })
  })
})
