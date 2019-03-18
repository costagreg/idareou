import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./RadioBox.scss')
}

const RadioBox = ({
  name,
  text,
  value,
  updateValue
}) => (
    <div className='RadioBox'>
      <input
        className='RadioBox__Input'
        id={name}
        name={name}
        type='radio'
        checked={value === 'checked' }
        readOnly
      />
      <label
        className='RadioBox__Label'
        onClick={() => updateValue(name, value === 'checked' ? '' : 'checked', '')}
      >
        {text}
      </label>
    </div>
)

RadioBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func
}

export default RadioBox
