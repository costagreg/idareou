import React from 'react'
import { shallow } from 'enzyme'

import TextInput, { showErrorMsg } from './TextInput'

describe('showErrorMsg', () => {
  describe('input is an array', () => {
    it('converts input to string', () => {
      const error = ['string1', 'string2']
      const expected = 'string1 string2'

      expect(showErrorMsg(error)).toEqual(expected)
    })
  })

  describe('input is a string', () => {
    it('returns a string', () => {
      const error = 'string1'
      const expected = 'string1'

      expect(error).toEqual(expected)
    })

    it('deletes the STANDARD_ERROR string', () => {
      const error = 'STANDARD_ERROR'
      const expected = ''

      expect(showErrorMsg(error)).toEqual(expected)
    })
  })
})

describe('@TextInput', () => {
  it('renders a text input as default', () => {
    const component = shallow(<TextInput type='text' />)

    expect(component.find('input').exists()).toBe(true)
    expect(component.find('input').prop('type')).toBe('text')
  })
  describe('passing type as password', () => {
    it('renders a password input', () => {
      const component = shallow(<TextInput type='password' />)

      expect(component.find('input').exists()).toBe(true)
      expect(component.find('input').prop('type')).toBe('password')
    })
  })
  describe('passing type as email', () => {
    it('renders a email input', () => {
      const component = shallow(<TextInput type='email' />)

      expect(component.find('input').exists()).toBe(true)
      expect(component.find('input').prop('type')).toBe('email')
    })
  })
  describe('passing an icon as parameter', () => {
    it('renders a fontawesome icon ', () => {
      const iconMock = 'iconMock'
      const component = shallow(<TextInput type='text' icon={iconMock} />)

      expect(component.find(`.fa-${iconMock}`).exists()).toBe(true)
    })
  })
  describe('passing placeholder as parameter', () => {
    it('renders a placeholder', () => {
      const placeholderMock = 'placeholderMock'
      const component = shallow(<TextInput placeholder={placeholderMock} />)

      expect(component.find('input').prop('placeholder')).toBe(placeholderMock)
    })
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const nameMock = 'nameMock'
      const component = shallow(<TextInput name={nameMock} />)

      expect(component.find('input').prop('name')).toBe(nameMock)
    })
  })
  describe('passing value as parameter', () => {
    it('adds the value parameter to the element', () => {
      const valueMock = 'valueMock'
      const component = shallow(<TextInput value={valueMock} />)

      expect(component.find('input').prop('value')).toBe(valueMock)
    })
  })
  describe('passing required as parameter', () => {
    it('adds the value parameter to the element', () => {
      const component = shallow(<TextInput required />)

      expect(component.find('input').prop('required')).toBe(true)
    })
  })
  describe('passing pattern as parameter', () => {
    it('adds the value parameter to the element', () => {
      const pattern = '[A-Z]'
      const component = shallow(<TextInput pattern={pattern} />)

      expect(component.find('input').prop('pattern')).toBe(pattern)
    })
  })
  describe('when passing error as a parameter', () => {
    describe('and error is error', () => {
      const component = shallow(<TextInput error='MOCK_ERROR' icon='at' />)

      it('should render the class TextInput--error', () => {
        expect(component.find('.TextInput--error').length).toBe(1)
        expect(component.find('.TextInput--success').length).toBe(0)
      })
      it('should render the class TextInput__Icon--error', () => {
        expect(component.find('.TextInput__Icon--error').length).toBe(1)
        expect(component.find('.TextInput__Icon--success').length).toBe(0)
      })
      it('should render the class TextInput__ErrorMsg', () => {
        expect(component.find('.TextInput__ErrorMsg').length).toBe(1)
        expect(component.find('.TextInput__ErrorMsg').text()).toBe('MOCK_ERROR')
      })
    })
  })
  describe('given removeInput parameter', () => {
    describe('when passing as true', () => {
      it('should add removeInput icon', () => {
        const component = shallow(<TextInput removeInput={true} />)

        expect(component.find('.TextInput__removeInput').exists()).toBe(true)
        expect(component.find('.fa-minus').exists()).toBe(true)
      })
      describe('and user click on the removeInputIcon', () => {
        it('should call removeFromState and onRemoveInput functions', () => {
          const currentProps = {
            removeFromState: jest.fn(),
            onRemoveInput: jest.fn(),
            removeInput: true,
            name: 'mockName'
          }

          const component = shallow(<TextInput {...currentProps} />)

          expect(currentProps.removeFromState).not.toHaveBeenCalled()
          expect(currentProps.onRemoveInput).not.toHaveBeenCalled()

          component.find('.TextInput__removeInput').simulate('click')

          expect(currentProps.removeFromState).toHaveBeenCalledTimes(1)
          expect(currentProps.removeFromState).toHaveBeenCalledWith(currentProps.name)
          expect(currentProps.onRemoveInput).toHaveBeenCalledTimes(1)
        })
      })
    })
    describe('when passing as a false', () => {
      it('should not render removeInput icon', () => {
        const component = shallow(<TextInput removeInput={false} />)

        expect(component.find('.TextInput__removeInput').exists()).toBe(false)
        expect(component.find('.fa-minus').exists()).toBe(false)
      })
    })
  })
  describe('onChange', () => {
    it('triggers the updateValue function passed', () => {
      const funcMock = jest.fn()
      const component = shallow(<TextInput updateValue={funcMock} />)

      component.find('input').simulate('change', { target: { value: '' } })

      expect(funcMock).toHaveBeenCalled()
    })
  })
})
