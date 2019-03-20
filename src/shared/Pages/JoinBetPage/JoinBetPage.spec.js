import React from 'react'
import { shallow } from 'enzyme'

import JoinBetPage from './JoinBetPage'

const initProps = {
  match: {
    params: {
      id: 'mockId'
    }
  }
}

describe('JoinBet page', () => {
  describe('render', () => {
    it('should render without errors', () => {
      const component = shallow(<JoinBetPage {...initProps} />)

      expect(component.exists()).toEqual(true)
    })
    it('should render JoinBetContainer passing the id bet', () => {
      const component = shallow(<JoinBetPage {...initProps} />)

      expect(component.find('withApollo(JoinBetContainer)').exists()).toEqual(true)
      expect(component.find('withApollo(JoinBetContainer)').props().betId).toEqual(initProps.match.params.id)
    })
  })
})
