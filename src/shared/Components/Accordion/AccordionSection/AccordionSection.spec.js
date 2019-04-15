import React from 'react'
import { shallow, mount } from 'enzyme'

import AccordionSection from './AccordionSection'

import bets from '~test/globalMocks/bets'

describe('given AccordionSection component', () => {
  const props = {
    ...bets()[0],
    onSelectSection: jest.fn(),
    title: 'title',
    state: 'state',
    children: {}
  }

  describe('when trying to render the AccordionSection component', () => {
    const component = shallow(<AccordionSection {...props} />)

    it('should render the AccordionSection component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the header', () => {
      expect(component.find('.accordionsection__header').length).toBe(1)
    })
    it('should render the state of the bet', () => {
      expect(component.find('.accordionsection__state').length).toBe(1)
    })
    it('should render the title', () => {
      const title = component.find('.accordionsection__title')

      expect(title.length).toBe(1)
      expect(title.text()).toBe(props.title)
    })
    it('should render the arrow', () => {
      expect(component.find('.arrow').length).toBe(1)
    })
    it('should render the card', () => {
      expect(component.find('.card').length).toBe(1)
    })
    it('should render the card', () => {
      expect(component.find('.card').length).toBe(1)
    })
    describe('when master is equal to currentUser', () => {
      it('shows the edit icon', () => {
        const component = shallow(<AccordionSection {...props} currentUser={props.master} />)

        expect(component.find('.fa-pencil').exists()).toBe(true)
      })
    })
  })
  describe('given the section selected and the currentHeight', () => {
    describe('when the section selected is the same as the current id', () => {
      it('should render the card with the maxHeight as current height passed', () => {
        const newProps = {
          ...props,
          sectionSelected: props.id,
          currentHeight: 100
        }
        const component = shallow(<AccordionSection {...newProps} />)

        expect(component.find('.card').props().style.maxHeight).toBe(`${newProps.currentHeight}px`)
      })
    })
    describe('when the section selected is not the same as the current id', () => {
      it('should render the card with maxtHeight as 0', () => {
        const newProps = {
          ...props,
          sectionSelected: 'random',
          currentHeight: 100
        }
        const component = shallow(<AccordionSection {...newProps} />)

        expect(component.find('.card').props().style.maxHeight).toBe(0)
      })
    })
  })
  xdescribe('@Callbacks', () => { // CHECK HOW TO CALL WITH THE REF
    describe('onSelecSection', () => {
      describe('when click on the header', () => {
        it('should call onSelectSection with the current Id and the cardRef', () => {
          const component = mount(<AccordionSection {...props} />)

          expect(props.onSelectSection).not.toHaveBeenCalled()

          const cardRef = component.find('.card').get(0)

          component.find('.accordionsection__header').simulate('click')

          expect(props.onSelectSection).toHaveBeenCalledWith(props.id, cardRef)
        })
      })
    })
  })
})
