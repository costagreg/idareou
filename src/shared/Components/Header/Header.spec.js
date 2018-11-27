import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

const linkCreator = (num) =>
  Array(num).fill('link').map((link, index) => <li key={index}>{link}</li>)

describe('Header', () => {
  describe('given Header component',() => {
    const props = {
      linskMarkUp: linkCreator(3),
      showSideBar: false,
      setShowSideBar: jest.fn()
    }
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('should render the Header component', () => {
      const component = shallow(<Header />)
      expect(component.find('.header').length).toBe(1)
    })
    it('should render a logo wrapper', () => {
      const component = shallow(<Header />)
      expect(component.find('.topnav__logo').length).toBe(1)
    })
    describe('when a list of links are passed', () => {
      describe('and the context is setup to desktop view', () => {
        const component = shallow(<Header context={{ isDesktop: true }} {...props}/>)
        it('should render the top nav links', () => {
          expect(component.find('.topnav').length).toBe(1)
        })
        it('should render the list of link passed', () => {
          expect(component.find('.topnav li').length).toBe(props.linskMarkUp.length)
        })
      })
      describe('when the context is setup to not desktop', () => {
        const component = shallow(<Header context={{ isDesktop: false }} {...props}/>)
        it('should render the sideBar component', () => {
          const sideBar = component.find('SideBar')

          expect(sideBar.length).toBe(1)
          expect(sideBar.props()).toEqual(props)
        })
        it('should render the topnav__icon', () => {
          const burger = component.find('.topnav__icon')

          expect(burger.length).toBe(1)
          expect(burger.hasClass('rotate')).toBe(false)
        })
        describe('and click on the header burger', () => {
          it('setshowSidebar should be called', () => {
            const burger = component.find('.topnav__icon')

            expect(props.setShowSideBar).not.toHaveBeenCalled()

            burger.simulate('click')

            expect(props.setShowSideBar).toHaveBeenCalledTimes(1)
          })
        })
        describe('and slider is showing', () => {
          const newProps = {
            ...props,
            showSideBar: true
          }
          const newComponent = shallow(<Header context={{ isDesktop: false }} {...newProps}/>)

          it('should rotate the image', () => {
            const burger = newComponent.find('.topnav__icon')

            expect(burger.length).toBe(1)
            expect(burger.hasClass('rotate')).toBe(true)
          })
        })
      })
    })
  })
})