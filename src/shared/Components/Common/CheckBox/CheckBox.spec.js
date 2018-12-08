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
      const nameMock = 'nameMock'
      const component = shallow(<CheckBox name={nameMock} />)

      expect(component.find('input[type=\'checkbox\']').prop('name')).toBe(nameMock)
    })
  })
  describe('passing text as parameter', () => {
    it('adds a label to the checkbox', () => {
      const textMock = 'textMock'
      const component = shallow(<CheckBox text={textMock} />)

      expect(component.find('.CheckBox__Label').text()).toBe(textMock)
    })
  })
})
