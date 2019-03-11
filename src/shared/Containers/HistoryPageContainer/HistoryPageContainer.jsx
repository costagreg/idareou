import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import HistoryPage from '~src/shared/Pages/HistoryPage'
import { findBetByCurrentUser } from '~src/shared/graphql/queries'

const DUMMYBETS = [
  {
    id: '0',
    title: 'first bet',
    description: 'Description my descripntion hahahaha',
    amount: 10,
    currency: '£',
    options: [
      {
        id: 'first choice',
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

export class HistoryPageContainer extends Component {
  render() {
    const bets = this.props.data.findBetByCurrentUser
    console.log(bets)

    return (
      <Fragment>
        <HistoryPage bets={bets}/>
      </Fragment>
    )
  }
}

HistoryPageContainer.propTypes = {
  bets: PropTypes.array,
  fetchToStore: PropTypes.func
}

export default graphql(findBetByCurrentUser)(HistoryPageContainer)
