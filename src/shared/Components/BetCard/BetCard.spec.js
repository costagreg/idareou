import React from 'react'
import { shallow } from 'enzyme'

import BetCard from './BetCard'

import bets from '~test/globalMocks/bets'

describe('given BetCard component', () => {
  const props = {
    ...bets()[0]
  }
  describe('when trying to render the BetCard component', () => {
    const component = shallow(<BetCard {...props}/>)
    it('should render the BetCard component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the description', () => {
      const description = component.find('.betcard__description')

      expect(description.length).toBe(1)
      expect(description.text()).toBe(props.description)
    })
    it('should render the amount', () => {
      const amount = component.find('.betcard__amount')

      expect(amount.length).toBe(1)
      expect(amount.text()).toBe(props.currency + props.amount)
    })
    describe('when trying to render the options', () => {
      it('should render all the options provided', () => {
        const options = component.find('.betcard__options')

        expect(options.length).toBe(props.options.length)
      })
      describe('and the option has been choosen', () => {
        xit('should have success class when state is success', () => {
          const newProps = {
            ...props,
            state: 'success'
          }
          const newComponent = shallow(<BetCard {...newProps}/>)
          const options = newComponent.find('.betcard__options')

          options.forEach((opt, index) => {
            if(newProps.options[index].choosen) {
              expect(opt.hasClass('betcard__options--success')).toBe(true)
            } else {
              expect(opt.hasClass('betcard__options--success')).toBe(false)
            }
            expect(opt.text()).toBe(newProps.options[index].opt)
          })
        })
        xit('should have fail class when state is fail', () => {
          const newProps = {
            ...props,
            state: 'fail'
          }
          const newComponent = shallow(<BetCard {...newProps}/>)
          const options = newComponent.find('.betcard__options')

          options.forEach((opt, index) => {
            if(newProps.options[index].choosen) {
              expect(opt.hasClass('betcard__options--fail')).toBe(true)
            } else {
              expect(opt.hasClass('betcard__options--fail')).toBe(false)
            }
            expect(opt.text()).toBe(newProps.options[index].opt)
          })
        })
      })
    })
  })
  describe('given participants by props', () => {
    describe('when trying to render participants', () => {
      const newProps = {
        ...props,
        participants: ['first', 'second', 'third']
      }
      const component = shallow(<BetCard {...newProps} />)
      it('should render all the participants', () => {
        const participants = component.find('.betcard__participants')

        expect(participants.length).toBe(newProps.participants.length)

        participants.forEach((participant, index) => {
          expect(participant.text()).toBe(newProps.participants[index])
        })
      })
    })
  })
})
