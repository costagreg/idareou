import React from 'react'
import classNames from 'classnames'

import UserProfileCard from '../../UserProfileCard'

if(process.browser) {
  require('./SideBar.scss')
}

const SideBar = ({ linskMarkUp, showSideBar, setShowSideBar, userProfile }) => {
  return (
    <div className="sidebar">
      <div
        className={classNames('sidebar__overlay', { show: showSideBar })}
        onClick={setShowSideBar}
        >
      </div>
      <div className={classNames('sidepanel', { show: showSideBar })}>
        {
          userProfile &&
            <div className='sidepanel__userprofile'>
              <UserProfileCard {...userProfile}/>
            </div>
        }
        <div className="sidepanel__links">
          { linskMarkUp }
        </div>
      </div>
    </div>
  )
}

export default SideBar
