import React from 'react'
import { shallow } from 'enzyme'

import RadioBox from './RadioBox'

describe('@RadioBox', () => {
  const nameMock = 'nameMock'
  const textMock = 'textMock'
  const optionValueMock = 'optionValueMock'

  it('renders a RadioBox input as default', () => {
    const component = shallow(<RadioBox />)

    expect(component.find('input[type=\'radio\']').exists()).toBe(true)
  })

  describe('passing name as parameter', () => {
    it('adds the name parameter to the element', () => {
      const component = shallow(<RadioBox name={nameMock} />)

      expect(component.find('input[type=\'radio\']').prop('name')).toBe(nameMock)
    })
  })

  describe('passing text as parameter', () => {
    it('adds a label to the RadioBox', () => {
      const component = shallow(<RadioBox text={textMock} />)

      expect(component.find('.RadioBox__Label').text()).toBe(textMock)
    })
  })

  describe('clicking on the radio box', () => {
    it('will trigger update value with current optionValue', () => {
      const updateValueMock = jest.fn(() => { })
      const component = shallow(<RadioBox name={nameMock} text={textMock} optionValue={optionValueMock} updateValue={updateValueMock} />)

      component.find('label').simulate('click')

      expect(updateValueMock).toHaveBeenCalledWith(nameMock, optionValueMock, '')
    })
  })
  describe('when value and optionValue are passed', () => {
    it('checkes the current radiobox if value is equal to optionValue', () => {
      const component = shallow(<RadioBox optionValue={optionValueMock} value={optionValueMock}/>)

      expect(component.find('input').prop('checked')).toEqual(true)
    })
    it('doesnt check the current radiobox if value is not equal to optionValue', () => {
      const component = shallow(<RadioBox optionValue={optionValueMock} value={'valueMock'}/>)

      expect(component.find('input').prop('checked')).toEqual(false)
    })
  })
})
