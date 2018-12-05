import React from 'react'
import PropTypes from 'prop-types'

if(process.browser) {
  require('./UserProfileCard.scss')
}

const UserProfileCard = ({ profileImage, userName }) => {
  return(
    <div className="userprofilecard">
    <div className="userprofilecard__image">
      <img
        alt='profileImage'
        src={profileImage || '/assets/images/default/defaultUser.png'}
      />
    </div>
      {
        userName &&
          <div className="userprofilecard__userName">
            {userName}
          </div>
      }
    </div>
  )
}

UserProfileCard.propTypes = {
  profileImage: PropTypes.string,
  userName: PropTypes.string
}

export default UserProfileCard
