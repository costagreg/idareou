import React from 'react'
import classNames from 'classnames'
import Proptypes from 'prop-types'

if(process.browser) {
  require('./BetCard.scss')
}

const BetCard = ({
  description,
  currency,
  amount,
  options,
  participants,
  state
}) => {
  return <div className="betcard">
    <div className="betcard__section betcard__description">{description}</div>
      <hr/>
      <div className="betcard__section betcard__amount">{currency + amount}</div>
      <hr/>
      <div className="betcard__section">
        <ul>
        {
          options.map(({ opt, choosen }, index) =>
            <li
              key={index}
              className={classNames('betcard__options', { 'betcard__options--success': choosen && state === 'success', 'betcard__options--fail': choosen && state === 'fail' })}
            >
              {opt}
            </li>)
          }
        </ul>
      </div>
      <hr/>
      { participants &&
        <div className="betcard__section">
          <ul>
            {
              participants.map(person => <li key={person} className="betcard__participants">{person}</li>)
            }
          </ul>
        </div>
      }
  </div>
}

BetCard.propTypes = {
  state: Proptypes.string,
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string,
  options: Proptypes.array,
  participants: Proptypes.array
}

export default BetCard
