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
      const mockplaceholder = 'mockplaceholder'
      const component = shallow(<TextArea placeholder={mockplaceholder}/>)

      expect(component.find('textarea').prop('placeholder')).toBe(mockplaceholder)
    })
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const mockname = 'mockname'
      const component = shallow(<TextArea name={mockname}/>)

      expect(component.find('textarea').prop('name')).toBe(mockname)
    })
  })
})
