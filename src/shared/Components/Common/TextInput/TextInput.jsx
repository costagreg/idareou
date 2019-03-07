import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isArray } from 'util';

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
    <div className={classNames('TextInput', { 'TextInput--error': error })}>
      <div className={classNames('TextInput__Container')}>
        {icon &&
          <i className={classNames('TextInput__Icon', 'fa', `fa-${icon}`, { 'TextInput__Icon--error': error })}></i>}
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
      <div className='TextInput__ErrorMsg'>{isArray(error) ? error.reduce((acc, error) => acc + ' ' + error, '') : error.replace('error', '')}</div>
    </div>
)

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text']),
  icon: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(String)]),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func,
  pattern: PropTypes.string,
  required: PropTypes.bool
}

TextInput.defaultProps = {
  value: '',
  type: 'text',
  error: '',
  onChange: () => { }
}

export default TextInput
