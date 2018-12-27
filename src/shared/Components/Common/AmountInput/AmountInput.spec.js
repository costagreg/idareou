import React from 'react'
import { shallow } from 'enzyme'

import AmountInput from './AmountInput'

describe('@AmountInput', () => {
  const initialProps = {
    name: 'mockName',
    value: '0.00',
    updateValue: () => {}
  }
  it('renders a number input', () => {
    const component = shallow(<AmountInput {...initialProps} />)

    expect(component.find('input').exists()).toBe(true)
    expect(component.find('input').prop('type')).toBe('number')
  })
  it('renders two buttons', () => {
    const component = shallow(<AmountInput {...initialProps} />)

    expect(component.find('button').length).toBe(2)
  })
  describe('passing "value" as parameter', () => {
    it('adds the value parameter to the text input', () => {
      const component = shallow(<AmountInput {...initialProps} />)

      expect(component.find('input').prop('value')).toBe(initialProps.value)
    })
  })
  describe('instance', () => {
    describe('onChangeValue', () => {
      describe('when increment is passed as action', () => {
        it('increment current value of 0.5', () => {
          const updateValueMock = jest.fn()
          const props = {
            ...initialProps,
            updateValue: updateValueMock
          }
          const component = shallow(<AmountInput {...props} />)
          const expectedValue = (parseFloat(props.value) + 0.5).toFixed(2)

          component.instance().onChangeValue('increment')

          expect(updateValueMock).toHaveBeenCalledWith(props.name, expectedValue)
        })
      })
      describe('when decrement is passed as action', () => {
        it('decrement current value of 0.5', () => {
          const updateValueMock = jest.fn()
          const props = {
            ...initialProps,
            value: '10',
            updateValue: updateValueMock
          }
          const component = shallow(<AmountInput {...props} />)
          const expectedValue = (parseFloat(props.value) - 0.5).toFixed(2)

          component.instance().onChangeValue('decrement')

          expect(updateValueMock).toHaveBeenCalledWith(props.name, expectedValue)
        })
        it('stops when value is less then 0', () => {
          const updateValueMock = jest.fn()
          const props = {
            ...initialProps,
            value: '0',
            updateValue: updateValueMock
          }
          const component = shallow(<AmountInput {...props} />)
          const expectedValue = '0.00'

          component.instance().onChangeValue('decrement')

          expect(updateValueMock).toHaveBeenCalledWith(props.name, expectedValue)
        })
      })
    })
  })
})
