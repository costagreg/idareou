import React from 'react'
import classNames from 'classnames'
import Proptypes from 'prop-types'

if (process.browser) {
  require('./BetCard.scss')
}

const BetCard = ({
  description,
  currency,
  amount,
  options,
  participants
}) => {
  return <div className="betcard">
    <div className="betcard__section betcard__description">{description}</div>
    <hr />
    <div className="betcard__section betcard__amount">{currency + amount}</div>
    <hr />
    <div className="betcard__section">
      <ul>
        {
          options.map(({ title }, index) =>
            <li
              key={index}
              className={classNames('betcard__options')}
            >
              {title}
            </li>)
        }
      </ul>
    </div>
    <hr />
    {participants &&
      <div className="betcard__section">
        <ul>
          {
            participants.map(({ user }) => <li key={user._id} className="betcard__participants">{user.username}</li>)
          }
        </ul>
      </div>
    }
  </div>
}

BetCard.propTypes = {
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string,
  options: Proptypes.array,
  participants: Proptypes.array
}

export default BetCard
