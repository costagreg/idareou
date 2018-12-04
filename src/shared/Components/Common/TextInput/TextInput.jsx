import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if(process.browser){
  require('./TextInput.scss')
}

const TextInput = ({name, type = 'text', icon, error, placeholder }) => (
  <div className='TextInput'>
    {icon ? <i className={classNames('TextInput__Icon','fa', `fa-${icon}`)}></i> : null}
    <input
      name={name}
      type={type}
      className={classNames('TextInput__Input', { 'error': error })}
      placeholder={placeholder}
    />
  </div>
)

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text']),
  icon: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

export default TextInput
