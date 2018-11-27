import React from 'react'
import { shallow } from 'enzyme'

import { HeaderContainer } from './HeaderContainer'

describe('HeaderContainer', () => {
  describe('given HeaderContainer component',() => {
    describe('when trying to render the component', () => {
      it('should render the component', () => {
        const component = shallow(<HeaderContainer />)

        expect(component.length).toBe(1)
      })
      it('should render the component', () => {
        const component = shallow(<HeaderContainer />)

        expect(component.find('Header').length).toBe(1)
      })
      describe('and the context is passed', () => {
        it('should pass the context to the Header', () => {
          const props = {
            context: { mocked: 'context' }
          }
          const component = shallow(<HeaderContainer {...props} />)

          expect(component.find('Header').props().context).toBe(props.context)
        })
      })
      describe('when trying to render the markup for links', () => {
        const mockRouters = [
          {
          path: '/1',
          name: 'mock1',
          exact: false
        },{
          path: '/2',
          name: 'mock2',
          exact: false
        }]
        it('should render as links as the routes passed', () => {
          const compInstance = shallow(<HeaderContainer />).instance()
          const links = compInstance.getLinkMarkUp(mockRouters)

          links.forEach((link,index) => {
            expect(link.key).toBe(mockRouters[index].name)
            expect(link.props.to).toBe(mockRouters[index].path)
            expect(link.props.onClick).toBe(compInstance.setShowSideBar)
            expect(link.props.children).toBe(mockRouters[index].name)
          })
        })
      })
      describe('when trying to toggle sidebar', () => {
        it('should set up the new sideBar shown status and pass to children component', () => {
          const component = shallow(<HeaderContainer />)
          const compInstance = component.instance()

          expect(compInstance.state.showSideBar).toBe(false)
          expect(component.find('Header').props().showSideBar).toBe(false)

          compInstance.setShowSideBar()

          expect(compInstance.state.showSideBar).toBe(true)
          expect(component.find('Header').props().showSideBar).toBe(true)

          compInstance.setShowSideBar()

          expect(compInstance.state.showSideBar).toBe(false)
          expect(component.find('Header').props().showSideBar).toBe(false)
        })
      })
    })
  })
})