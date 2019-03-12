import React from 'react'
import { shallow } from 'enzyme'

import BetLinkPage from './BetLinkPage'

describe('given BetLinkPage component', () => {
  describe('when trying to render the BetLinkPage component', () => {
    const component = shallow(<BetLinkPage />)
    it('should render the BetLinkPage component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetLinkPageContainer', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetLinkPage title', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetLinkPage link', () => {
      expect(component.length).toBe(1)
    })
    it('should render the BetLinkPage secondTitle', () => {
      expect(component.length).toBe(1)
    })
  })
})
