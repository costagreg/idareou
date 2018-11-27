import React from 'react'
import classNames from 'classnames'

if(process.browser){
  require('./SideBar.scss')
}

const SideBar = ({ linskMarkUp, showSideBar, setShowSideBar }) => {
  return (
    <div className="sidebar">
      <div
        className={classNames('sidebar__overlay', { 'show': showSideBar })}
        onClick={setShowSideBar}
        >
      </div>
      <div className={classNames('sidebar__panel', { 'show': showSideBar })}>
        { linskMarkUp }
      </div>
    </div>
  )
}

export default SideBar