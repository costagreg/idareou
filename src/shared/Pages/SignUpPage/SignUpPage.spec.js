import React from 'react'
import { shallow } from 'enzyme'

import SignUpPage from './SignUpPage'

describe('given SignUpPage component', () => {
  describe('when trying to render the SignUpPage component', () => {
    const component = shallow(<SignUpPage />)
    it('should render the SignUpPage component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the page title component', () => {
      expect(component.find('PageTitle').length).toBe(1)
    })
    it('should render the signUpPageContainer component', () => {
      expect(component.find('Apollo(SignUpPageContainer)').length).toBe(1)
    })
  })
})
