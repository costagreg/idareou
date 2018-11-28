import React from 'react'

if (process.browser) {
  require('./FormContainer.scss')
}

const FormContainer = ({children}) => (
  <form className={'FormContainer'}>
    {children}
  </form>
)

export default FormContainer
