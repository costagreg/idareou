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
    it('renders a textinput for title', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('TextInput[name="title"]').length).toBe(1)
    })
    it('renders a textarea for description', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('TextArea[name="description"]').length).toBe(1)
    })
    it('renders an amountInput for amount', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('AmountInput[name="amount"]').length).toBe(1)
    })
    it('renders a button for submit', () => {
      const component = shallow(<BetPageContainer />)

      expect(component.find('Button').length).toBe(1)
    })
  })
})
