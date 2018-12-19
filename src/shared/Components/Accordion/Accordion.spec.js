import React from 'react'
import { shallow } from 'enzyme'

import Accordion from './Accordion'

describe('given Accordion component', () => {
  describe('when trying to render the Accordion component', () => {
    it('should render the Accordion component', () => {
      const component = shallow(<Accordion />)

      expect(component.length).toBe(1)
    })
  })
})
