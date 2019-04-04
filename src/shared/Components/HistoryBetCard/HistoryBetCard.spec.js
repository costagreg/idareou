import React from 'react'
import { shallow } from 'enzyme'

import HistoryBetCard from './HistoryBetCard'

import bets from '~test/globalMocks/bets'

describe('given HistoryHistoryBetCard component', () => {
  const props = {
    ...bets()[0]
  }
  describe('when trying to render the HistoryBetCard component', () => {
    const component = shallow(<HistoryBetCard {...props} />)
    it('should render the HistoryBetCard component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the description', () => {
      const description = component.find('.historybetcard__description')

      expect(description.length).toBe(1)
      expect(description.text()).toBe(props.description)
    })
    it('should render the amount', () => {
      const amount = component.find('.historybetcard__amount')

      expect(amount.length).toBe(1)
      expect(amount.text()).toBe(props.currency + props.amount)
    })
    describe('when trying to render the options', () => {
      it('should render all the options provided', () => {
        const options = component.find('.historybetcard__options')

        expect(options.length).toBe(props.options.length)
      })
      describe('and the option has been choosen', () => {
        xit('should have success class when state is success', () => {
          const newProps = {
            ...props,
            state: 'success'
          }
          const newComponent = shallow(<HistoryBetCard {...newProps} />)
          const options = newComponent.find('.historybetcard__options')

          options.forEach((opt, index) => {
            if (newProps.options[index].choosen) {
              expect(opt.hasClass('historybetcard__options--success')).toBe(true)
            } else {
              expect(opt.hasClass('historybetcard__options--success')).toBe(false)
            }
            expect(opt.text()).toBe(newProps.options[index].opt)
          })
        })
        xit('should have fail class when state is fail', () => {
          const newProps = {
            ...props,
            state: 'fail'
          }
          const newComponent = shallow(<HistoryBetCard {...newProps} />)
          const options = newComponent.find('.historybetcard__options')

          options.forEach((opt, index) => {
            if (newProps.options[index].choosen) {
              expect(opt.hasClass('historybetcard__options--fail')).toBe(true)
            } else {
              expect(opt.hasClass('historybetcard__options--fail')).toBe(false)
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
        participants: [{ user: { _id: '', username: 'first' } }]
      }
      const component = shallow(<HistoryBetCard {...newProps} />)
      it('should render all the participants', () => {
        const participants = component.find('.historybetcard__participants')

        expect(participants.length).toBe(newProps.participants.length)

        participants.forEach((participant, index) => {
          expect(participant.text()).toBe(newProps.participants[index].user.username)
        })
      })
    })
  })
})
