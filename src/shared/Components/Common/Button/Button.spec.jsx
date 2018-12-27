import React from 'react'
import { shallow } from 'enzyme'

import Button from './Button'

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
  describe('when children is passed', () => {
    it('passes the children in button', () => {
      const textMock = 'textMock'
      const component = shallow(<Button disabled={true}>{textMock}</Button>)

      expect(component.find('button').text()).toBe(textMock)
    })
  })
  describe('when type is submit', () => {
    it('sets the type to submit', () => {
      const component = shallow(<Button type='submit' />)

      expect(component.find('button').prop('type')).toBe('submit')
    })
  })
})
