import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { currentUser } from '~src/shared/graphql/queries'
import UserProfileCard from '~src/shared/Components/UserProfileCard'

if (process.browser) {
  require('./SideBar.scss')
}

export const SideBar = ({ linskMarkUp, showSideBar, setShowSideBar, data: { currentUser } }) => (
  <div className="sidebar">
    <div
      className={classNames('sidebar__overlay', { show: showSideBar })}
      onClick={setShowSideBar}
    >
    </div>
    <div className={classNames('sidepanel', { show: showSideBar })}>
      {
        currentUser &&
        <div className='sidepanel__userprofile'>
          <UserProfileCard {...currentUser} />
        </div>
      }
      <div className="sidepanel__links">
        {linskMarkUp}
      </div>
    </div>
  </div>
)

SideBar.propTypes = {
  userProfile: PropTypes.object,
  linskMarkUp: PropTypes.array,
  showSideBar: PropTypes.bool,
  setShowSideBar: PropTypes.func
}

export default graphql(currentUser)(SideBar)
