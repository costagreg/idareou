import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import HistoryPage from '~src/shared/Pages/HistoryPage'

const DUMMYBETS = [
  {
    id: '0',
    title: 'first bet',
    description: 'Description my descripntion hahahaha',
    amount: 10,
    currency: '£',
    options: [
      {
        opt: 'first',
        choosen: true
      },
      {
        opt: 'second choice',
        choosen: false
      }
    ],
    participants: ['jose', 'greg', 'myfriend'],
    state: 'fail'
  },
  {
    id: '1',
    title: 'first bet',
    description: 'Description my descripntion hahahaha',
    amount: 10,
    currency: '£',
    options: [
      {
        opt: 'first',
        choosen: true
      },
      {
        opt: 'first',
        choosen: false
      }
    ],
    participants: ['jose', 'greg', 'myfriend'],
    state: 'success'
  }
]

export default class HistoryPageContainer extends Component {
  render() {
    return (
      <Fragment>
        <HistoryPage bets={DUMMYBETS}/>
      </Fragment>
    )
  }
}

HistoryPageContainer.propTypes = {
  bets: PropTypes.array,
  fetchToStore: PropTypes.func
}
