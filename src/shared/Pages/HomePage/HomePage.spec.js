import React from 'react'
import { shallow } from 'enzyme'

import HomePage from './HomePage'

describe('HomePage', () => {
  describe('given HomePage component', () => {
    describe('when trying to render the component', () => {
      it('should render the component', () => {
        const component = shallow(<HomePage />)

        expect(component.length).toBe(1)
      })
    })
  })
})
