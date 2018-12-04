import React from 'react'
import TextInput from './TextInput'
import { shallow } from 'enzyme'

describe('@TextInput', () => {
  it('renders a text input as default', () => {
    const component = shallow(<TextInput type='text' />)

    expect(component.find('input').exists()).toBe(true)
    expect(component.find('input').prop('type')).toBe('text')
  })
  it('renders state.value as value of the input', () => {
    const component = shallow(<TextInput type='text' />)
  
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
      const mockicon = 'mockicon'
      const component = shallow(<TextInput type='text' icon={mockicon}/>)

      expect(component.find(`.fa-${mockicon}`).exists()).toBe(true)
    })
  })
  describe('passing error as parameter', () => {
    it('adds the error class to the element', () => {
      const component = shallow(<TextInput type='text' error='mockerror'/>)

      expect(component.find('.error').exists()).toBe(true)
    })
  })
  describe('passing placeholder as parameter', () => {
    it('renders a placeholder', () => {
      const mockplaceholder = 'mockplaceholder'
      const component = shallow(<TextInput placeholder={mockplaceholder}/>)
      
      expect(component.find('input').prop('placeholder')).toBe(mockplaceholder)
    })
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const mockname = 'mockname'
      const component = shallow(<TextInput name={mockname}/>)

      expect(component.find('input').prop('name')).toBe(mockname)
    })
  })
})
