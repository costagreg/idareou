import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { currentUser } from '~src/shared/graphql/queries'
import UserProfileCard from '~src/shared/Components/UserProfileCard'

if (process.browser) {
  require('./Sidebar.scss')
}

export const Sidebar = ({ linskMarkUp, showSidebar, setShowSidebar, data: { currentUser } }) => (
  <div className="Sidebar">
    <div
      className={classNames('Sidebar__overlay', { show: showSidebar })}
      onClick={setShowSidebar}
    >
    </div>
    <div className={classNames('sidepanel', { show: showSidebar })}>
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

Sidebar.propTypes = {
  userProfile: PropTypes.object,
  linskMarkUp: PropTypes.array,
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func
}

export default graphql(currentUser)(Sidebar)
