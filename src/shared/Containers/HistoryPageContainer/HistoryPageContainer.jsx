import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { initialState } from '~src/shared/redux/configureStore' // TODO: Remove when redux is fully set up

import HistoryPage from '~src/shared/Pages/HistoryPage'

import { fetchToStore } from '~src/shared/redux/bets/bets'

export class HistoryPageContainer extends Component {
  static fetchData(store) {
    return store.dispatch(fetchToStore(initialState().bets)) // TODO: Remove when redux is fully set up
  }

  componentDidMount() {
    const { bets = [], fetchToStore } = this.props

    if(!bets.length) {
      fetchToStore(initialState().bets) // TODO: Remove when redux is fully set up
    }
  }

  render() {
    return (
      <Fragment>
        <HistoryPage bets={this.props.bets}/>
      </Fragment>
    )
  }
}

HistoryPageContainer.propTypes = {
  bets: PropTypes.array,
  fetchToStore: PropTypes.func
}


export default connect(
  state => ({
    bets: state.bets
  }),
  { fetchToStore }
)(HistoryPageContainer)
