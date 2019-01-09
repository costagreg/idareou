import React from 'react'
import { shallow } from 'enzyme'

import { BetPageContainer } from './BetPageContainer'

describe('BetPageContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('renders', () => {
    it('renders a form', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('FormContainer').length).toBe(1)
    })
  })
})
