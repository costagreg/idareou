import { shallow } from 'enzyme'
import React from 'react'

import FormContainer from './FormContainer'

const mockEvents = {
  preventDefault: jest.fn(),
  target: {
    elements: []
  }
}

describe('FormContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('renders a html form', () => {
    const component = shallow(<FormContainer />)

    expect(component.find('form').exists()).toBe(true)
  })
  it('renders all children passed', () => {
    const component = shallow(<FormContainer><div className='classMock'></div></FormContainer>)

    expect(component.find('.classMock').exists()).toBe(true)
  })
  describe('@ithasErrors', () => {
    describe('if any form element fail the validation', () => {
      it('should return success in errors', () => {
        const arrayElements = [{
          name: 'first',
          value: 'first',
          checkValidity: jest.fn(() => false)
        }, {
          name: 'second',
          value: 'second',
          checkValidity: jest.fn(() => true)
        }]

        const newInstance = shallow(<FormContainer />).instance()

        const { itHasErrors } = newInstance
        newInstance.updateValue = jest.fn()
        newInstance.isConfirmSuccess = jest.fn(() => true)

        const elementWithName = arrayElements.reduce((acc, ele) => ele.name ? ++acc : acc, 0)

        expect(itHasErrors(arrayElements)).toBe(true)
        expect(newInstance.updateValue).toHaveBeenCalledTimes(elementWithName)
      })
    })
    describe('if every form element success the validation', () => {
      it('should return success in errors', () => {
        const arrayElements = [{
          name: 'first',
          value: 'first',
          checkValidity: jest.fn(() => true)
        }, {
          name: 'second',
          value: 'second',
          checkValidity: jest.fn(() => true)
        }]

        const newInstance = shallow(<FormContainer />).instance()

        const { itHasErrors } = newInstance
        newInstance.updateValue = jest.fn()
        newInstance.isConfirmSuccess = jest.fn(() => true)

        const elementWithName = arrayElements.reduce((acc, ele) => ele.name ? ++acc : acc, 0)

        expect(itHasErrors(arrayElements)).toBe(false)
        expect(newInstance.updateValue).toHaveBeenCalledTimes(elementWithName)
      })
    })
  })
  describe('@isConfirmSuccess', () => {
    describe('and the element name is confirmpassword', () => {
      describe('and the password has the same value as confirmPassword', () => {
        it('it would return true', () => {
          const nodeElements = [{
            name: 'password',
            type: 'password',
            value: 'password1'
          }, {
            name: 'confirmPassword',
            type: 'password',
            value: 'password1'
          }]
  
          const component = shallow(<FormContainer />)
          const { isConfirmSuccess } = component.instance()
  
          component.setState({ [nodeElements[0].name]: {
            value: nodeElements[0].value
          } })
  
          expect(isConfirmSuccess(nodeElements[1])).toBe(true)
        })
      })
      describe('and the password has different value as confirmPassword', () => {
        it('it would return false', () => {
          const nodeElements = [{
            name: 'password',
            type: 'password',
            value: 'password1'
          }, {
            name: 'confirmPassword',
            type: 'password',
            value: 'password2'
          }]
  
          const component = shallow(<FormContainer />)
          const { isConfirmSuccess } = component.instance()
  
          component.setState({ [nodeElements[0].name]: {
            value: nodeElements[0].value
          } })
  
          expect(isConfirmSuccess(nodeElements[1])).toBe(false)
        })
      })
    })
    describe('and the element name is confirmEmail', () => {
      describe('and the email has the same value as confirmEmail', () => {
        it('it would return true', () => {
          const nodeElements = [{
            name: 'email',
            type: 'email',
            value: 'email1'
          }, {
            name: 'confirmEmail',
            type: 'email',
            value: 'email1'
          }]
  
          const component = shallow(<FormContainer />)
          const { isConfirmSuccess } = component.instance()
  
          component.setState({ [nodeElements[0].name]: {
            value: nodeElements[0].value
          } })
  
          expect(isConfirmSuccess(nodeElements[1])).toBe(true)
        })
      })
      describe('and the email has different value as confirmEmail', () => {
        it('it would return false', () => {
          const nodeElements = [{
            name: 'email',
            type: 'email',
            value: 'email1'
          }, {
            name: 'confirmEmail',
            type: 'email',
            value: 'email2'
          }]
  
          const component = shallow(<FormContainer />)
          const { isConfirmSuccess } = component.instance()
  
          component.setState({ [nodeElements[0].name]: {
            value: nodeElements[0].value
          } })
  
          expect(isConfirmSuccess(nodeElements[1])).toBe(false)
        })
      })
    })
    describe('and the element name is not any confirm element', () => {
      it('should return true', () => {
        const nodeElements = {
          name: 'password',
          type: 'password',
          value: 'password1'
        }
  
        const component = shallow(<FormContainer />)
        const { isConfirmSuccess } = component.instance()

        expect(isConfirmSuccess(nodeElements)).toBe(true)
      })
    })
  })
  describe('@updateValue', () => {
    describe('when trying to update a value within the state', () => {
      it('should save the value as name passed, with value and error provided', () => {
        const element = {
          name: 'mockedname',
          value: 'mockedValue',
          error: ''
        }

        const component = shallow(<FormContainer />)

        const { updateValue } = component.instance()

        expect(component.state()).toEqual({})

        updateValue(...Object.values(element))

        expect(component.state()).toEqual({ [element.name]: { value: element.value, error: element.error } })

        const newElementValues = {
          ...element,
          value: 'newMocked'
        }

        updateValue(...Object.values(newElementValues))

        expect(component.state()).toEqual({ [element.name]: { value: newElementValues.value, error: element.error } })
      })
    })
  })
  describe('on submit', () => {
    describe('when the onsubmit is passed and the form has not errors', () => {
      it('triggers the callback passed', () => {
        const mockCall = jest.fn()
        const component = shallow(<FormContainer onSubmit={mockCall} />)

        component.instance().itHasErrors = jest.fn(() => false)
        component.simulate('submit', mockEvents)

        expect(mockCall).toHaveBeenCalledTimes(1)
        expect(mockEvents.preventDefault).toHaveBeenCalledTimes(1)
      })
    })
  })
})
