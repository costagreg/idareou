import React from 'react'
import { shallow } from 'enzyme'

import History from './HistoryPage'

describe('given History component', () => {
  describe('when trying to render the History component', () => {
    it('should render the History component', () => {
      const component = shallow(<History />)

      expect(component.length).toBe(1)
    })
  })
})
