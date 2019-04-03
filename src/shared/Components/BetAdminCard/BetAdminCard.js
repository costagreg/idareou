import React from 'react'
import Proptypes from 'prop-types'

if (process.browser) {
  require('./BetAdminCard.scss')
}

const BetAdminCard = ({
  title = '',
  description = '',
  amount = '',
  currency = ''
}) => {
  return <div className="betadmincard">
    <div className="betadmincard__section betadmincard__title">{title}</div>
    <div className="betadmincard__section betadmincard__description">{description}</div>
    <div className="betadmincard__section betadmincard__amount">{currency + amount}</div>
  </div>
}

BetAdminCard.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string,
  options: Proptypes.array
}

export default BetAdminCard
