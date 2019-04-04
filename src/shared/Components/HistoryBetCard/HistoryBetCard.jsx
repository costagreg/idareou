import React from 'react'
import classNames from 'classnames'
import Proptypes from 'prop-types'

if (process.browser) {
  require('./HistoryBetCard.scss')
}

const HistoryBetCard = ({
  description,
  currency,
  amount,
  options,
  participants
}) => {
  return <div className="historybetcard">
    <div className="historybetcard__section historybetcard__description">{description}</div>
    <hr />
    <div className="historybetcard__section historybetcard__amount">{currency + amount}</div>
    <hr />
    <div className="historybetcard__section">
      <ul>
        {
          options.map(({ title }, index) =>
            <li
              key={index}
              className={classNames('historybetcard__options')}
            >
              {title}
            </li>)
        }
      </ul>
    </div>
    <hr />
    {participants &&
      <div className="historybetcard__section">
        <ul>
          {
            participants.map(({ user }) => <li key={user._id} className="historybetcard__participants">{user.username}</li>)
          }
        </ul>
      </div>
    }
  </div>
}

HistoryBetCard.propTypes = {
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string,
  options: Proptypes.array,
  participants: Proptypes.array
}

export default HistoryBetCard
