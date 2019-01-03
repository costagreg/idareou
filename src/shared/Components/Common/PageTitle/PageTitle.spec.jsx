import { shallow } from 'enzyme'
import React from 'react'

import PageTitle from './PageTitle'

describe('PageTitle', () => {
  it('renders a h2 title', () => {
    const component = shallow(<PageTitle />)

    expect(component.find('h2').exists()).toBe(true)
  })
  it('renders title passed', () => {
    const titleMock = 'titleMock'
    const component = shallow(<PageTitle>{titleMock}</PageTitle>)

    expect(component.find('h2').text()).toBe(titleMock)
  })
})
