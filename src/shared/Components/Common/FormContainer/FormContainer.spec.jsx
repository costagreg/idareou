import FormContainer from './FormContainer'
import { shallow } from 'enzyme'
import React from 'react'

describe('FormContainer', () => {
  it('renders a html form', () => {
    const component = shallow(<FormContainer />)

    expect(component.find('form').exists()).toBe(true)
  })
  it('renders all children passed', () => {
    const component = shallow(<FormContainer><div className='classMock'></div></FormContainer>)   

    expect(component.find('.classMock').exists()).toBe(true)
  })
})
