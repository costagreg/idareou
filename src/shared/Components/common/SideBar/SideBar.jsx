import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import UserProfileCard from '~src/shared/Components/UserProfileCard'

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

SideBar.propTypes = {
  userProfile: PropTypes.object,
  linskMarkUp: PropTypes.array,
  showSideBar: PropTypes.bool,
  setShowSideBar: PropTypes.func
}

export default SideBar
