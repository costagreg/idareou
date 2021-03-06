import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

if (process.browser) {
  require('./Button.scss')
}

const Button = ({ type = '', onClick, disabled = false, children }) => (
  <button
    type={type}
    className={classNames('Button', { disabled })}
    onClick={onClick}
    disabled={disabled}
  >{children}</button>
)

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string
}

export default Button
