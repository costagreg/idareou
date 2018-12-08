import React from 'react'
import { shallow } from 'enzyme'

import TextArea from './TextArea'

describe('@TextArea', () => {
  it('renders a text area as default', () => {
    const component = shallow(<TextArea />)

    expect(component.find('textarea').exists()).toBe(true)
  })
  describe('passing error as parameter', () => {
    it('adds the error class to the element', () => {
      const component = shallow(<TextArea error='mockerror'/>)

      expect(component.find('.error').exists()).toBe(true)
    })
  })
  describe('passing placeholder as parameter', () => {
    it('renders a placeholder', () => {
      const placeholderMock = 'placeholderMock'
      const component = shallow(<TextArea placeholder={placeholderMock}/>)

      expect(component.find('textarea').prop('placeholder')).toBe(placeholderMock)
    })
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const nameMock = 'nameMock'
      const component = shallow(<TextArea name={nameMock}/>)

      expect(component.find('textarea').prop('name')).toBe(nameMock)
    })
  })
  describe('passing value as parameter', () => {
    it('adds the value parameter to the element', () => {
      const valueMock = 'valueMock'
      const component = shallow(<TextArea value={valueMock}/>)

      expect(component.find('textarea').prop('value')).toBe(valueMock)
    })
  })
  describe('onChange', () => {
    it('triggers the updateValue passed', () => {
      const funcMock = jest.fn()
      const component = shallow(<TextArea updateValue={funcMock} />)

      component.find('textarea').simulate('change', { target: { value: '' } })

      expect(funcMock).toHaveBeenCalled()
    })
  })
})
