import { shallow } from 'enzyme'
import React from 'react'

import FormContainer from './FormContainer'

const mockEvents = {
  preventDefault: jest.fn(),
  target: {
    elements: []
  }
}

describe('FormContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('renders a html form', () => {
    const component = shallow(<FormContainer />)

    expect(component.find('form').exists()).toBe(true)
  })
  it('renders all children passed', () => {
    const component = shallow(<FormContainer><div className='classMock'></div></FormContainer>)

    expect(component.find('.classMock').exists()).toBe(true)
  })
  describe('on submit', () => {
    it('triggers the callback passed', () => {
      const mockCall = jest.fn()
      const component = shallow(<FormContainer onSubmit={mockCall} />)

      component.simulate('submit', mockEvents)

      expect(mockCall.mock.calls.length).toBe(1)
      expect(mockEvents.preventDefault).toHaveBeenCalledTimes(1)
    })
  })
})
