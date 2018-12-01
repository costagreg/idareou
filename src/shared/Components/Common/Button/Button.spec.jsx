import Button from './Button'
import React from 'react'
import { shallow } from 'enzyme'

describe('Button', () => {
  it('renders a button', () => {
      const component = shallow(<Button />)
      expect(component.find('button').exists()).toBe(true)
  })
  describe('when it is clicked', () => {
    it('triggers the function passed in onClick', () => {
      const f1Mock = jest.fn()
      const component = shallow(<Button onClick={f1Mock} />)
      component.simulate('click')
      expect(f1Mock.mock.calls.length).toBe(1)
    })
  })
  describe('when disabled is true', () => {
    it('adds the disabled classname', () => {
      const component = shallow(<Button disabled={true} />)     
      expect(component.find('button').hasClass('disabled')).toBe(true)
    })
  })
  describe('when text is passed', () => {
    it('passes the text in button value', () => {
      const mockText = 'mockText'
      const component = shallow(<Button disabled={true} text={mockText} />)
      expect(component.find('button').text()).toBe(mockText)
    })
  })
})
