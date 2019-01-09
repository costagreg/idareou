import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./TextCheckBox.scss')
}

const TextCheckBox = ({ name, placeholder }) => (
  <div className='TextCheckBox'>
    <input className='TextCheckBox__Input' id={`checkbox_${name}`} type='checkbox' />
    <label className='TextCheckBox__Label' htmlFor={`checkbox_${name}`} />
    <input className='TextCheckBox__Text' name={name} type='text' placeholder={placeholder}/>
  </div>
)

TextCheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string
}

export default TextCheckBox
