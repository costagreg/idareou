import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if (process.browser) {
  require('./CheckBox.scss')
}

const CheckBox = ({ name, text }) => (
  <div className='CheckBox'>
    <input className='CheckBox__Input' id={name} name={name} type='checkbox' />
    <label className='CheckBox__Label' for={name} >{text}</label>
  </div>
)

CheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string
}

export default CheckBox
