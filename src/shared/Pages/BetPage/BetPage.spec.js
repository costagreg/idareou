import React from 'react'
import { shallow } from 'enzyme'
import BetPage from './BetPage'

jest.mock('../../Containers/BetPageContainer', () => function BetPageContainer() {})

describe('BetPage', () => {
  describe('when trying to render the component', () => {
    it('should render the component without error', () => {
      const component = shallow(<BetPage />)

      expect(component.length).toBe(1)
    })
    it('should render a pagetitle', () => {
      const component = shallow(<BetPage />)

      expect(component.find('PageTitle').length).toBe(1)
    })
    it('should render a pagetitle', () => {
      const component = shallow(<BetPage />)

      expect(component.find('BetPageContainer').length).toBe(1)
    })
  })
})
