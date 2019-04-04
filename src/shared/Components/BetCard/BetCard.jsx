import React from 'react'
import Proptypes from 'prop-types'

if (process.browser) {
  require('./BetCard.scss')
}

const BetCard = ({
  title = '',
  description = '',
  amount = '',
  currency = ''
}) => {
  return <div className="betcard">
    <div className="betcard__section betcard__title">{title}</div>
    <div className="betcard__section betcard__description">{description}</div>
    <div className="betcard__section betcard__amount">{currency + amount}</div>
  </div>
}

BetCard.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string
}

export default BetCard
