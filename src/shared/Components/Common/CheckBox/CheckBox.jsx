import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./CheckBox.scss')
}

const CheckBox = ({
  name,
  text,
  value,
  updateValue
}) => (
    <div className='CheckBox'>
      <input
        className='CheckBox__Input'
        id={name}
        name={name}
        type='checkbox'
        checked={value === 'checked' }
        readOnly
      />
      <label
        className='CheckBox__Label'
        onClick={() => updateValue(name, value === 'checked' ? '' : 'checked', '')}
      >
        {text}
      </label>
    </div>
)

CheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func
}

export default CheckBox
