import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./CheckBox.scss')
}

const CheckBox = ({ name, text, value }) => (
  <div className='CheckBox'>
    <input className='CheckBox__Input' id={name} name={name} value={value} type='checkbox' />
    <label className='CheckBox__Label' htmlFor={name} >{text}</label>
  </div>
)

CheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string
}

export default CheckBox
