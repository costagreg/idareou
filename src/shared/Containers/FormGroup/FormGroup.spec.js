
import React from 'react'
import { shallow } from 'enzyme'

import { FormGroup } from './FormGroup'
const ComponentMock = () => (<div></div>)

describe('FormGroup', () => {
  describe('render', () => {
    it('renders all children passed', () => {
      const component = shallow(<FormGroup><div className='MockTest'></div></FormGroup>)

      expect(component.find('.MockTest').exists()).toEqual(true)
    })

    describe('when child is a React Component', () => {
      it('injects updateValue function', () => {
        const component = shallow(<FormGroup><ComponentMock /></FormGroup>)

        expect(component.find('ComponentMock').props().updateValue).toEqual(component.instance().updateValue)
      })

      it('injects name and value to the Component if present', () => {
        const component = shallow(<FormGroup><ComponentMock name='option1' /></FormGroup>)
        component.setState({
          option1: 'mockValue'
        })
        expect(component.find('ComponentMock').props().value).toEqual('mockValue')
      })
    })
  })
  describe('@updateValue', () => {
    it('updates the state according to the parameters passed', () => {
      const component = shallow(<FormGroup><ComponentMock /></FormGroup>)

      expect(component.setState({ 'option-2': 'value' }))

      component.instance().updateValue('option-1', 'value')

      expect(component.state()).toEqual({ 'option-1': 'value' })
    })
  })
})
