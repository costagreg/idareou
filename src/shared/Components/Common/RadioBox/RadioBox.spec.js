import React from 'react'
import { shallow } from 'enzyme'

import RadioBox from './RadioBox'

describe('@RadioBox', () => {
  it('renders a RadioBox input as default', () => {
    const component = shallow(<RadioBox />)

    expect(component.find('input[type=\'radio\']').exists()).toBe(true)
  })
  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const nameMock = 'nameMock'
      const component = shallow(<RadioBox name={nameMock} />)

      expect(component.find('input[type=\'radio\']').prop('name')).toBe(nameMock)
    })
  })
  describe('passing text as parameter', () => {
    it('adds a label to the RadioBox', () => {
      const textMock = 'textMock'
      const component = shallow(<RadioBox text={textMock} />)

      expect(component.find('.RadioBox__Label').text()).toBe(textMock)
    })
  })
})
