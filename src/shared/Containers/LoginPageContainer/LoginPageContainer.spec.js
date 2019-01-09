import React from 'react'
import { shallow } from 'enzyme'

import { LoginPageContainer } from './LoginPageContainer'

describe('LoginPageContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('renders', () => {
    it('renders a form', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('FormContainer').length).toBe(1)
    })
  })
})
