import PageTitle from './PageTitle'
import { shallow } from 'enzyme'
import React from 'react'

describe('PageTitle', () => {
  it('renders a h2 title', () => {
    const component = shallow(<PageTitle />)

    expect(component.find('h2').exists()).toBe(true)
  })
  it('renders title passed', () => {
    const mockTitle = 'mocktitle'
    const component = shallow(<PageTitle title={mockTitle} />)

    expect(component.find('h2').text()).toBe(mockTitle)
  })
})
