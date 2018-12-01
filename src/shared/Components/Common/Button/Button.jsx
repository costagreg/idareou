import React from 'react'
import classNames from 'classnames'

if (process.browser) {
  require('./Button.scss')
}

const Button = ({ onClick = () => {}, disabled = false, text }) => (
  <button
    className={classNames('Button', {disabled})}
    onClick={onClick}
    disabled={disabled}
  >{text}</button>
)

export default Button
