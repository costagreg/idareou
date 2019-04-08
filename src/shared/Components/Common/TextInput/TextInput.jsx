import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if (process.browser) {
  require('./TextInput.scss')
}

export const showErrorMsg = (error) => {
  return Array.isArray(error) ? error.join(' ') : error.replace('STANDARD_ERROR', '')
}

const TextInput = ({
  name,
  type,
  icon,
  removeInput,
  removeFromState = () => {},
  onRemoveInput = () => {},
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
        { removeInput &&
          <i onClick={() => {
            removeFromState(name)
            onRemoveInput()
          }}
            className='TextInput__removeInput fa fa-minus'>
          </i>
        }
      </div>
      <div className='TextInput__ErrorMsg'>{showErrorMsg(error)}</div>
    </div>
)

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text']),
  removeInput: PropTypes.bool,
  removeFromState: PropTypes.func,
  onRemoveInput: PropTypes.func,
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
