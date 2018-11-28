import React from 'react'

if (process.browser) {
  require('./PageTitle.scss')
}

const PageTitle = ({ title }) => (
  <h2 className={'PageTitle'}>{title}</h2>
)

export default PageTitle
