import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./RadioBox.scss')
}

const RadioBox = ({
  name,
  text,
  value,
  optionValue,
  updateValue
}) => (
    <div className='RadioBox'>
      <input
        className='RadioBox__Input'
        name={name}
        type='radio'
        checked={value === optionValue}
        readOnly

      />
      <label
        className='RadioBox__Label'
        htmlFor={name}
        onClick={() => { updateValue(name, optionValue, '') }}
      >
        {text}
      </label>
    </div>
)

RadioBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func,
  optionValue: PropTypes.string
}

export default RadioBox
