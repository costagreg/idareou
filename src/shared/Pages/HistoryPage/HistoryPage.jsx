import React from 'react'
import PropTypes from 'prop-types'

import Accodion from '~src/shared/Components/Accordion'
import HistoryBetCard from '~src/shared/Components/HistoryBetCard'

const HistoryPage = ({ bets }) => {
  return <div>
    { bets &&
      <Accodion sections={bets}>
        <HistoryBetCard />
      </Accodion>
    }
  </div>
}

HistoryPage.propTypes = {
  bets: PropTypes.array
}

export default HistoryPage
