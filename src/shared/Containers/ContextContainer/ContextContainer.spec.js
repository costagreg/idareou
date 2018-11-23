import React from 'react'
import { shallow } from 'enzyme'

import Consumer, { ContextContainer } from './ContextContainer'

import deviceTypes from '../../helpers/deviceTypes'

const MockChild = () => <div>child</div>

describe('ContextContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('Consumer', () => {
    describe('given the consumer', () => {
      it('exist', () => {
        expect(Consumer).toBeDefined()
      })
    })
  })
  describe('given ContextContainer', () => {
    describe('when trying to render thecomponent', () => {
      it('should render the component', () => {
        const wrapper = shallow(<ContextContainer><MockChild/></ContextContainer>)

        expect(wrapper.length).toBe(1)
        expect(wrapper.find('MockChild').exists()).toBe(true)
      })
      describe('when passing props if desktop device', () => {
        describe('and is desktop device', () => {
          it('should render a desktop view', () => {
            const props = {
              isDesktop: true
            }
            const wrapper = shallow(<ContextContainer {...props}><MockChild/></ContextContainer>)

            expect(wrapper.props().value).toEqual(props)
          })
        })
        describe('and is not desktop device', () => {
          it('should render a mobile view', () => {
            const props = {
              isDesktop: false
            }
            const wrapper = shallow(<ContextContainer {...props}><MockChild/></ContextContainer>)

            expect(wrapper.props().value).toEqual(props)
          })
        })
      })
    })
    describe('when trying to set up the view', () => {
      describe('and the window is a desktop view', () => {
        it('should render a desktop view', () => {
          const deviceTypeDesktop = deviceTypes.breakpoints.laptop.min
          const mockTarget = { target: { innerWidth: deviceTypeDesktop }}
          const props = { isDesktop: false }

          const wrapper = shallow(<ContextContainer {...props}><MockChild/></ContextContainer>)

          expect(wrapper.props().value).toEqual({ isDesktop: false })

          wrapper.instance().setView(mockTarget)

          expect(wrapper.props().value).toEqual({ isDesktop: true })
        })
      })
      describe('and the window is a not a desktop view', () => {
        it('should render a mobile view', () => {
          const deviceTypeDesktop = deviceTypes.breakpoints.tablet.max
          const mockTarget = { target: { innerWidth: deviceTypeDesktop }}
          const props = { isDesktop: true }

          const wrapper = shallow(<ContextContainer {...props}><MockChild/></ContextContainer>)

          expect(wrapper.props().value).toEqual({ isDesktop: true })

          wrapper.instance().setView(mockTarget)

          expect(wrapper.props().value).toEqual({ isDesktop: false })
        })
      })
    })
    describe('lifeCycle', () => {
      describe('when componentDidMount', () => {
        it('should attach setView to resize listener to the window', () => {
          const wrapper = shallow(<ContextContainer><MockChild/></ContextContainer>)

          const realListener = global.addEventListener
          global.addEventListener = jest.fn()
          expect(global.addEventListener).not.toHaveBeenCalled()

          const instance = wrapper.instance()
          instance.componentDidMount()

          expect(global.addEventListener).toHaveBeenCalledTimes(1)
          global.addEventListener = realListener
        })
      })
      describe('when componentWillUnmount', () => {
        it('should attach setView to resize listener to the window', () => {
          const wrapper = shallow(<ContextContainer><MockChild/></ContextContainer>)

          const realListener = global.removeEventListener
          global.removeEventListener = jest.fn()
          expect(global.removeEventListener).not.toHaveBeenCalled()

          const instance = wrapper.instance()
          instance.componentDidMount()
          instance.componentWillUnmount()

          expect(global.removeEventListener).toHaveBeenCalledTimes(1)
          global.removeEventListener = realListener
        })
      })
    })
  })
})