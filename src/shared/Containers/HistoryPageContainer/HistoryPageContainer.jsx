import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { initialState } from '~src/shared/redux/configureStore' // Remove

import HistoryPage from '~src/shared/Pages/HistoryPage'

import { fetchToStore } from '~src/shared/redux/bets/bets'

export class HistoryPageContainer extends Component {
  static fetchData(store) {
    return store.dispatch(fetchToStore(initialState().bets)) // Remove the data passed
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
  bets: PropTypes.array
}


export default connect(
  state => ({
    bets: state.bets
  }),
  undefined
)(HistoryPageContainer)
