import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if (process.browser) {
  require('./TextInput.scss')
}

const TextInput = ({
  name,
  type,
  icon,
  error,
  placeholder,
  value,
  updateValue,
  required = false,
  pattern
}) => (
    <div className={classNames('TextInput', { 'TextInput--error': error === 'error' })}>
      {icon &&
        <i className={classNames('TextInput__Icon', 'fa', `fa-${icon}`, { 'TextInput__Icon--error': error === 'error' })}></i>}
      <input
        name={name}
        type={type}
        className='TextInput__Input'
        placeholder={placeholder}
        value={value}
        required={required}
        pattern={pattern}
        onChange={e => { updateValue(name, e.target.value, '') }}
      />
    </div>
)

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text']),
  icon: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func,
  required: PropTypes.bool
}

TextInput.defaultProps = {
  value: '',
  type: 'text',
  onChange: () => { }
}

export default TextInput
