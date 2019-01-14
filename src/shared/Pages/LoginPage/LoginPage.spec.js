import React from 'react'
import { shallow } from 'enzyme'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  describe('when trying to render the component', () => {
    it('should render without errors', () => {
      const component = shallow(<LoginPage />)

      expect(component.length).toBe(1)
    })
    it('should render the Login title', () => {
      const component = shallow(<LoginPage />)

      expect(component.find('PageTitle').exists()).toBe(true)
    })
    it('should render the LoginPageContainer', () => {
      const component = shallow(<LoginPage />)

      expect(component.find('LoginPageContainer').exists()).toBe(true)
    })
    it('should render the SignUp msg', () => {
      const component = shallow(<LoginPage />)

      expect(component.find('.LoginPage__Msg').exists()).toBe(true)
    })
  })
})
