import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if(process.browser){
  require('./TextInput.scss')
}

const TextInput = ({ type = 'text', icon, error, placeholder }) => (
  <div className='TextInput'>
    {icon ? <i className={classNames('TextInput__Icon','fa', `fa-${icon}`)}></i> : null}
    <input type={type} className={classNames('TextInput__Input', { 'error': error })} placeholder={placeholder}  />
  </div>
)

TextInput.propTypes = {
  type: PropTypes.oneOf(['email', 'password', 'text'])
}

export default TextInput

