import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./PageTitle.scss')
}

const PageTitle = ({ children, className }) => (
  <h2 className={classNames('PageTitle', className)}>{children}</h2>
)

PageTitle.propTypes = {
  title: PropTypes.string
}

export default PageTitle
