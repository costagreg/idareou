import React from 'react'

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

export default UserProfileCard