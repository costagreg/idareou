import React from 'react'
import classNames from 'classnames'

if(process.browser){
  require('./TextArea.scss')
}

const TextArea = ({ type = 'text', icon, error, placeholder }) => (
  <div className='TextArea'>
    <textarea type={type} className={classNames('TextArea__Input', { 'error': error })} placeholder={placeholder}  />
  </div>
)

export default TextArea
