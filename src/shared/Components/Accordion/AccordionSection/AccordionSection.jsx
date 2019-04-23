import React from 'react'
import Proptypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

if (process.browser) {
  require('./AccordionSection.scss')
}

const AccordionSection = ({
  id,
  title,
  state,
  sectionSelected,
  onSelectSection,
  currentHeight,
  children,
  master,
  currentUser
}) => {
  let cardRef = undefined

  return <div className="accordionsection">
    <div className="accordionsection__header" onClick={() => onSelectSection(id, cardRef)}>
      { master === currentUser && <Link className="accordionsection__edit" to={`/bet/${id}`}><i className={classNames('fa fa-pencil')}></i></Link> }
      <span className={`accordionsection__state accordionsection__state--${state}`}></span>
      <span className="accordionsection__title">{title}</span>
      <i className={classNames('fa fa-angle-left', 'arrow', { 'arrow--selected': sectionSelected === id })}></i>
    </div>
    <div
      ref={ref => cardRef = ref}
      className="card"
      style={{ maxHeight: sectionSelected === id && currentHeight ? `${currentHeight}px` : 0 }}
    >
      {children}
    </div>
  </div>
}

AccordionSection.propTypes = {
  id: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
  sectionSelected: Proptypes.string,
  onSelectSection: Proptypes.func.isRequired,
  currentHeight: Proptypes.number
}

export default AccordionSection
