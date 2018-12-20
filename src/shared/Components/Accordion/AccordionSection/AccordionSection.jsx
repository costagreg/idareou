import React from 'react'
import Proptypes from 'prop-types'
import classNames from 'classnames'

if(process.browser) {
  require('./AccordionSection.scss')
}

const AccordionSection = ({
  id,
  title,
  state,
  body: {
    description,
    amount,
    currency,
    options,
    participants
  },
  sectionSelected,
  onSelectSection,
  currentHeight
}) => {
  let cardRef = undefined

  return <div className="accordionsection">
    <div className="accordionsection__header" onClick={() => onSelectSection(id, cardRef)}>
      <span className={`accordionsection__state ${state}`}></span>
      {title}
      <i className={classNames('fa fa-angle-left', 'arrow', { selected: sectionSelected === id })}></i>
    </div>
    <div
      ref={ref => cardRef = ref}
      className="card"
      style={{ maxHeight: sectionSelected === id ? `${currentHeight}px` : 0 }}
    >
      <div className="card__section">{description}</div>
      <hr/>
      <div className="card__section card__amount">{currency + amount}</div>
      <hr/>
      <div className="card__section">
        <ul>
        {
          options.map(({ opt, selected }, index) =>
            <li
              key={index}
              className={classNames('card__options', { success: selected && state === 'success', fail: selected && state === 'fail' })}
            >
              {opt}
            </li>)
          }
        </ul>
      </div>
      <hr/>
      <div className="card__section">
        <ul>
          {
            participants.map(person => <li key={person} className="card__participants">{person}</li>)
          }
        </ul>
      </div>
    </div>
  </div>
}

AccordionSection.propTypes = {
  id: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  state: Proptypes.string,
  body: Proptypes.shape({
    description: Proptypes.string.isRequired,
    amount: Proptypes.number.isRequired,
    currency: Proptypes.string.isRequired,
    options: Proptypes.array.isRequired,
    participants: Proptypes.array
  }),
  sectionSelected: Proptypes.string,
  onSelectSection: Proptypes.func,
  currentHeight: Proptypes.number
}

export default AccordionSection
