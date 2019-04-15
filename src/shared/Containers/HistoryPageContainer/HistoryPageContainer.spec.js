import React from 'react'
import { shallow } from 'enzyme'

import { HistoryPageContainer } from './HistoryPageContainer'

const currentBets = [{
  _id: 'firstbet',
  title: 'mybet'
}]

const currentUser = {
  _id: 'firstbet',
  name: 'Greg'
}

describe('given HistoryPageContainer component', () => {
  const initProps = {
    queryCurrentBets: { currentBets },
    queryCurrentUser: { currentUser }
  }
  describe('when trying to render the HistoryPageContainer component', () => {
    it('should render the HistoryPageContainer component', () => {
      const component = shallow(<HistoryPageContainer {...initProps} />)

      expect(component.length).toBe(1)
    })
    it('should render accordions with HistoryBetCard', () => {
      const component = shallow(<HistoryPageContainer {...initProps} />)

      expect(component.find('Accordion').exists()).toBe(true)
      expect(component.find('Accordion').props()).toMatchObject({
        sections: currentBets,
        currentUser: currentUser._id
      })
      expect(component.find('Accordion HistoryBetCard').exists()).toBe(true)
    })
  })
})
