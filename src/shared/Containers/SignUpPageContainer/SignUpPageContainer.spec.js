import React from 'react'
import { shallow } from 'enzyme'

import SignUpPageContainer from './SignUpPageContainer'

describe('given SignUpPageContainer component', () => {
  describe('when trying to render the SignUpPageContainer component', () => {
    const component = shallow(<SignUpPageContainer />)

    it('should render the SignUpPageContainer component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the FormContainer component', () => {
      expect(component.find('FormContainer').length).toBe(1)
    })
    it('should render the TextInputs', () => {
      expect(component.find('TextInput').length).toBe(5)
    })
    it('should render the Button', () => {
      expect(component.find('Button').length).toBe(1)
    })
  })
})
