import React from 'react'
import TextArea from './TextArea'
import { shallow } from 'enzyme'

describe('@TextArea', () => {
  it('renders a text area as default', () => {
    const component = shallow(<TextArea type='text' />)

    expect(component.find('textarea').exists()).toBe(true)
  })
  describe('passing error as parameter', () => {
    it('adds the error class to the element', () => {
      const component = shallow(<TextArea type='text' error='mockerror'/>)

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
})
