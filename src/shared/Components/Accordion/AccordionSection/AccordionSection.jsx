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

  return <div className="accordionsection" onClick={() => onSelectSection(id, cardRef)}>
    <div className="accordionsection__header">
      <div className={`accordionsection__state ${state}`}></div>
      {title}
      <i className={classNames('fa fa-angle-left', 'arrow', { selected: sectionSelected === id })}></i>
    </div>
    <div
      ref={ref => cardRef = ref}
      className="card"
      style={{ maxHeight: sectionSelected === id ? `${currentHeight}px` : 0 }}
    >
      <div className="card__description">{description}</div>
      <div className="card__amount">{currency + amount}</div>
      <div className="card_options">
        <ul>
        {
          options.map(({ opt }) => <li>{opt}</li>)
        }
        </ul>
      </div>
      <div className="card__participants">
        <ul>
          {
            participants.map(person => <li>{person}</li>)
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
