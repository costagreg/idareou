import React from 'react'
import { shallow } from 'enzyme'

import UserProfileCard from './UserProfileCard'

describe('UserProfileCard', () => {
  describe('given UserProfileCard', () => {
    describe('when trying to render the component', () => {
      it('should render the component', () => {
        const component = shallow(<UserProfileCard />)

        expect(component.length).toBe(1)
      })
      describe('and trying to render the profile image', () => {
        describe('and the profile image is passed by props', () => {
          it('should render the profile image', () => {
            const props = {
              profileImage: 'mock-image'
            }
            const component = shallow(<UserProfileCard {...props}/>)
            const pImage = component.find('.userprofilecard__image').children()

            expect(pImage.length).toBe(1)
            expect(pImage.props().src).toBe(props.profileImage)
          })
        })
      })
      describe('and the profile image is not passed by props', () => {
        it('should render the default profileImage ', () => {
          const component = shallow(<UserProfileCard/>)
          const pImage = component.find('.userprofilecard__image').children()

          expect(pImage.length).toBe(1)
          expect(pImage.props().src).toBe('/assets/images/default/defaultUser.png')
        })
      })
      describe('and username is passed by props', () => {
        it('should render the username', () => {
          const props = {
            userName: 'mockUserName'
          }
          const component = shallow(<UserProfileCard {...props}/>)

          expect(component.find('.userprofilecard__userName').text()).toBe(props.userName)
        })
      })
      describe('and username is not passed by props', () => {
        it('should not render the username', () => {
          const component = shallow(<UserProfileCard />)

          expect(component.find('.userprofilecard__userName').length).toBe(0)
        })
      })
    })
  })
})