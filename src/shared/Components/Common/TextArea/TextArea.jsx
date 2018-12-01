import React from 'react'
import classNames from 'classnames'

if(process.browser){
  require('./TextArea.scss')
}

const TextArea = ({ error, placeholder }) => (
  <div className='TextArea'>
    <textarea className={classNames('TextArea__Input', { error })} placeholder={placeholder}  />
  </div>
)

export default TextArea
