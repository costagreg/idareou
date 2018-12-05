import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./FormContainer.scss')
}

const FormContainer = ({ children, onSubmit }) => (
  <form className='FormContainer' onSubmit={onSubmit}>
    {children}
  </form>
)

FormContainer.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

export default FormContainer
