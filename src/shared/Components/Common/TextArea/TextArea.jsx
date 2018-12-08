import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

if(process.browser) {
  require('./TextArea.scss')
}

const TextArea = ({ name, error, value, placeholder, onChange }) => (
  <div className='TextArea'>
    <textarea
      name={name}
      className={classNames('TextArea__Input', { error })}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
)

TextArea.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

export default TextArea
