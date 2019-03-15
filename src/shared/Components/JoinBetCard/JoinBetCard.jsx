import React from 'react'
import classNames from 'classnames'
import Proptypes from 'prop-types'

if (process.browser) {
  require('./JoinBetCard.scss')
}

const JoinBetCard = ({
  title,
  description,
  amount,
  currency,
  participants = [],
  options = []
}) => {
  return <div className="joinbetcard">
  <div className="joinbetcard__section joinbetcard__title">{title}</div>
  <div className="joinbetcard__section joinbetcard__description">{description}</div>
  <div className="joinbetcard__section joinbetcard__amount">{currency + amount}</div>
  <div className="joinbetcard__section">
    <ul>
      {
        options.map(({ title }, index) =>
          <li
            key={index}
            className={classNames('joinbetcard__options')}
          >
            {title}
          </li>)
      }
    </ul>
  </div>
  <hr />
  {participants &&
    <div className="joinbetcard__section">
      <ul>
        {
          participants.map(person => <li key={person} className="joinbetcard__participants">{person}</li>)
        }
      </ul>
    </div>
  }
</div>
}

JoinBetCard.propTypes = {
  description: Proptypes.string,
  amount: Proptypes.number,
  currency: Proptypes.string,
  options: Proptypes.array,
  participants: Proptypes.array
}

export default JoinBetCard
