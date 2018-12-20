import React from 'react'
import { shallow, mount } from 'enzyme'

import AccordionSection from './AccordionSection'

import bets from '../../../../../test/globalMocks/bets'

describe('given AccordionSection component', () => {
  const props = {
    ...bets()[0],
    onSelectSection: jest.fn()
  }

  describe('when trying to render the AccordionSection component', () => {
    const component = shallow(<AccordionSection {...props}/>)

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
    it('should render the description', () => {
      const description = component.find('.card_description')

      expect(description.length).toBe(1)
      expect(description.text()).toBe(props.body.description)
    })
    it('should render the amount', () => {
      const amount = component.find('.card__amount')

      expect(amount.length).toBe(1)
      expect(amount.text()).toBe(props.body.currency + props.body.amount)
    })
    describe('when trying to render the options', () => {
      it('should render all the options provided', () => {
        const options = component.find('.card__options')

        expect(options.length).toBe(props.body.options.length)
      })
      describe('and the option has been choosen', () => {
        it('should have success class when state is success', () => {
          const newProps = {
            ...props,
            state: 'success'
          }
          const newComponent = shallow(<AccordionSection {...newProps}/>)
          const options = newComponent.find('.card__options')

          options.forEach((opt, index) => {
            if(newProps.body.options[index].choosen) {
              expect(opt.hasClass('success')).toBe(true)
            } else {
              expect(opt.hasClass('success')).toBe(false)
            }
            expect(opt.text()).toBe(newProps.body.options[index].opt)
          })
        })
        it('should have fail class when state is fail', () => {
          const newProps = {
            ...props,
            state: 'fail'
          }
          const newComponent = shallow(<AccordionSection {...newProps}/>)
          const options = newComponent.find('.card__options')

          options.forEach((opt, index) => {
            if(newProps.body.options[index].choosen) {
              expect(opt.hasClass('fail')).toBe(true)
            } else {
              expect(opt.hasClass('fail')).toBe(false)
            }
            expect(opt.text()).toBe(newProps.body.options[index].opt)
          })
        })
      })
    })
  })
  describe('given participants by props', () => {
    describe('when trying to render participants', () => {
      const newProps = {
        ...props,
        body: {
          ...props.body,
          participants: ['first', 'second', 'third']
        }
      }
      const component = shallow(<AccordionSection {...newProps} />)
      it('should render all the participants', () => {
        const participants = component.find('.card__participants')

        expect(participants.length).toBe(newProps.body.participants.length)

        participants.forEach((participant, index) => {
          expect(participant.text()).toBe(newProps.body.participants[index])
        })
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
