import React from 'react'
import { shallow } from 'enzyme'

import CheckBox from './CheckBox'

describe('@CheckBox', () => {
  it('renders a checkBox input as default', () => {
    const component = shallow(<CheckBox />)

    expect(component.find('input[type=\'checkbox\']').exists()).toBe(true)
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const mockname = 'mockname'
      const component = shallow(<CheckBox name={mockname} />)

      expect(component.find('input[type=\'checkbox\']').prop('name')).toBe(mockname)
    })
  })
  describe('passing text as parameter', () => {
    it('adds a label to the checkbox', () => {
      const mocktext = 'mocktext'
      const component = shallow(<CheckBox text={mocktext} />)

      expect(component.find('.CheckBox__Label').text()).toBe(mocktext)
    })
  })
})
