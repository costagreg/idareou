import React from 'react'
import { shallow } from 'enzyme'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  describe('when trying to render the component', () => {
    const component = shallow(<LoginPage />)
    it('should render without errors', () => {
      expect(component.length).toBe(1)
    })
    it('should render the Login title', () => {
      expect(component.find('PageTitle').exists()).toBe(true)
    })
    it('should render the LoginPageContainer', () => {
      expect(component.find('LoginPageContainer').exists()).toBe(true)
    })
    it('should render the SignUp msg', () => {
      expect(component.find('.LoginPage__Msg').exists()).toBe(true)
    })
    describe('when the sign up link is clicked', () => {
      it('should redirect to signup page', () => {
        expect(component.find('.LoginPage__Msg Link').props().to).toBe('/signup')
      })
    })
  })
})
