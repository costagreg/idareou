import React from 'react'
import { shallow } from 'enzyme'

import TextInput from './TextInput'

describe('@TextInput', () => {
  it('renders a text input as default', () => {
    const component = shallow(<TextInput type='text' />)

    expect(component.find('input').exists()).toBe(true)
    expect(component.find('input').prop('type')).toBe('text')
  })
  describe('passing type as password', () => {
    it('renders a password input', () => {
      const component = shallow(<TextInput type='password'/>)

      expect(component.find('input').exists()).toBe(true)
      expect(component.find('input').prop('type')).toBe('password')
    })
  })
  describe('passing type as email', () => {
    it('renders a email input', () => {
      const component = shallow(<TextInput type='email'/>)

      expect(component.find('input').exists()).toBe(true)
      expect(component.find('input').prop('type')).toBe('email')
    })
  })
  describe('passing an icon as parameter', () => {
    it('renders a fontawesome icon ', () => {
      const iconMock = 'iconMock'
      const component = shallow(<TextInput type='text' icon={iconMock}/>)

      expect(component.find(`.fa-${iconMock}`).exists()).toBe(true)
    })
  })
  describe('passing error as parameter', () => {
    it('adds the error class to the element', () => {
      const component = shallow(<TextInput type='text' error='errorMock'/>)

      expect(component.find('.error').exists()).toBe(true)
    })
  })
  describe('passing placeholder as parameter', () => {
    it('renders a placeholder', () => {
      const placeholderMock = 'placeholderMock'
      const component = shallow(<TextInput placeholder={placeholderMock}/>)

      expect(component.find('input').prop('placeholder')).toBe(placeholderMock)
    })
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const nameMock = 'nameMock'
      const component = shallow(<TextInput name={nameMock}/>)

      expect(component.find('input').prop('name')).toBe(nameMock)
    })
  })
  describe('passing value as parameter', () => {
    it('adds the value parameter to the element', () => {
      const valueMock = 'valueMock'
      const component = shallow(<TextInput value={valueMock}/>)

      expect(component.find('input').prop('value')).toBe(valueMock)
    })
  })
  describe('passing onchange as parameter', () => {
    it('adds the onchange parameter to the element', () => {
      const funcMock = () => {}
      const component = shallow(<TextInput onChange={funcMock}/>)

      expect(component.find('input').prop('onChange')).toBe(funcMock)
    })
  })
})
