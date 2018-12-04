import React from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./PageTitle.scss')
}

const PageTitle = ({ title }) => (
  <h2 className={'PageTitle'}>{title}</h2>
)

PageTitle.propTypes = {
  title: PropTypes.string
}

export default PageTitle
