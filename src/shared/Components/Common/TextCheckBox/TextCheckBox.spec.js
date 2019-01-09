import React from 'react'
import { shallow } from 'enzyme'

import TextCheckBox from './TextCheckBox'

describe('@TextCheckBox', () => {
  it('renders a checkBox and a text input as default', () => {
    const component = shallow(<TextCheckBox />)

    expect(component.find('input[type=\'checkbox\']').exists()).toBe(true)
    expect(component.find('input[type=\'text\']').exists()).toBe(true)
  })
})
