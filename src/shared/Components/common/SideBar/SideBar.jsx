import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { me } from '~src/shared/graphql/queries'
import UserProfileCard from '~src/shared/Components/UserProfileCard'

if(process.browser) {
  require('./SideBar.scss')
}

class SideBar extends Component {
  render() {
    const { linskMarkUp, showSideBar, setShowSideBar, data: { me } } = this.props
    console.log(me)
    return (
      <div className="sidebar">
        <div
          className={classNames('sidebar__overlay', { show: showSideBar })}
          onClick={setShowSideBar}
          >
        </div>
        <div className={classNames('sidepanel', { show: showSideBar })}>
          {
            me &&
              <div className='sidepanel__userprofile'>
                <UserProfileCard {...me}/>
              </div>
          }
          <div className="sidepanel__links">
            { linskMarkUp }
          </div>
        </div>
      </div>
    )
  }
}

SideBar.propTypes = {
  userProfile: PropTypes.object,
  linskMarkUp: PropTypes.array,
  showSideBar: PropTypes.bool,
  setShowSideBar: PropTypes.func
}

export default graphql(me)(SideBar)
