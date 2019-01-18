import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

if(process.browser) {
  require('./TextArea.scss')
}

const TextArea = ({ name, error, value, placeholder, updateValue }) => (
  <div className='TextArea'>
    <textarea
      name={name}
      className={classNames('TextArea__Input', { error })}
      placeholder={placeholder}
      value={value}
      onChange={(e) => { updateValue(name, e.target.value)}}
    />
  </div>
)

TextArea.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  updateValue: PropTypes.func
}

export default TextArea
