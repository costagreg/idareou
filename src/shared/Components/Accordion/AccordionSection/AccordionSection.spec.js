import React from 'react'
import { shallow } from 'enzyme'

import AccordionSection from './AccordionSection'

describe('given AccordionSection component', () => {
  describe('when trying to render the AccordionSection component', () => {
    it('should render the AccordionSection component', () => {
      const component = shallow(<AccordionSection />)

      expect(component.length).toBe(1)
    })
  })
})
