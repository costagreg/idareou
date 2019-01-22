import React from 'react'
import PropTypes from 'prop-types'

import Accodion from '~src/shared/Components/Accordion'
import BetCard from '~src/shared/Components/BetCard'

const HistoryPage = ({ bets }) => {
  return <div>
    { bets &&
      <Accodion sections={bets}>
        <BetCard />
      </Accodion>
    }
  </div>
}

HistoryPage.propTypes = {
  bets: PropTypes.array
}

export default HistoryPage
