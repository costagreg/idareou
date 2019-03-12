import React from 'react'
import { shallow } from 'enzyme'

import { HistoryPageContainer } from './HistoryPageContainer'

describe('given HistoryPageContainer component', () => {
  describe('when trying to render the HistoryPageContainer component', () => {
    it('should render the HistoryPageContainer component', () => {
      const graphQlData = [{ currentBets: [] }]
      const component = shallow(<HistoryPageContainer data={graphQlData} />)

      expect(component.length).toBe(1)
      expect(component.find('HistoryPage').length).toBe(1)
    })
  })
})
