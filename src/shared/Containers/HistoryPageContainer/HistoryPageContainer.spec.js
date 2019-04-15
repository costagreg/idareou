import React from 'react'
import { shallow } from 'enzyme'

import { HistoryPageContainer } from './HistoryPageContainer'

const graphQlData = {
  currentBets: [{
    id: 'firstbet',
    title: 'mybet'
  }]
}

describe('given HistoryPageContainer component', () => {
  describe('when trying to render the HistoryPageContainer component', () => {
    it('should render the HistoryPageContainer component', () => {
      const component = shallow(<HistoryPageContainer data={graphQlData} />)

      expect(component.length).toBe(1)
    })
    it('should render accordions with HistoryBetCard', () => {
      const graphQlData = [{ currentBets: [] }]
      const component = shallow(<HistoryPageContainer data={graphQlData} />)

      expect(component.find('Accordion').exists()).toBe(true)
      expect(component.find('Accordion HistoryBetCard').exists()).toBe(true)
    })
  })
})
