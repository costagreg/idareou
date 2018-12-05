import React from 'react'

if (process.browser) {
  require('./FormContainer.scss')
}

const FormContainer = ({children, onSubmit}) => (
  <form className='FormContainer' onSubmit={onSubmit}>
    {children}
  </form>
)

export default FormContainer
