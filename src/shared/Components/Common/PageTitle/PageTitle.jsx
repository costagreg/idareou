import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./PageTitle.scss')
}

const PageTitle = ({ children }) => (
  <h2 className='PageTitle'>{children}</h2>
)

PageTitle.propTypes = {
  title: PropTypes.string
}

export default PageTitle
