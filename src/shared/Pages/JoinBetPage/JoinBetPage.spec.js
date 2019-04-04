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

jest.mock('../../Containers/JoinBetContainer', () => function JoinBetContainer() { return <div></div>})

describe('JoinBet page', () => {
  describe('render', () => {
    it('should render without errors', () => {
      const component = shallow(<JoinBetPage {...initProps} />)

      expect(component.exists()).toEqual(true)
    })
    it('should render JoinBetContainer passing the id bet', () => {
      const component = shallow(<JoinBetPage {...initProps} />)

      expect(component.find('JoinBetContainer').exists()).toEqual(true)
      expect(component.find('JoinBetContainer').props().betId).toEqual(initProps.match.params.id)
    })
  })
})
