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
    it('renders a textinput for email', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('TextInput[name="email"]').exists()).toBe(true)
    })
    it('renders a textinput for password', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('TextInput[name="password"]').exists()).toBe(true)
    })
    it('renders a textinput a submit button', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('Button').exists()).toBe(true)
    })
  })
})
