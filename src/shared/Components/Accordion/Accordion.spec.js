import React from 'react'
import { shallow } from 'enzyme'

import Accordion from './Accordion'

const mockBets = [
  { id: '0' },
  { id: '1' }
]

describe('given Accordion component', () => {
  describe('when trying to render the Accordion component', () => {
    it('should render the Accordion component', () => {
      const component = shallow(<Accordion />)

      expect(component.length).toBe(1)
    })
    describe('when bets are passed', () => {
      it('should render an accordionSection per bet', () => {
        const component = shallow(<Accordion bets={mockBets}/>)
        const { onSelectSection } = component.instance()
        const accordionSections = component.find('AccordionSection')

        expect(accordionSections.length).toBe(mockBets.length)

        accordionSections.forEach((section, index) => {
          expect(section.props()).toEqual({
            id: mockBets[index].id,
            onSelectSection,
            sectionSelected: null,
            currentHeight: 0
          })
        })
      })
    })
    describe('@methods', () => {
      describe('onSelectSetion', () => {
        describe('when a new section is selected', () => {
          it('should save the new selection and current height on the state', () => {
            const mockArguments = {
              id: '0',
              cardRef: {
                scrollHeight: 10
              }
            }
            const newInstance = shallow(<Accordion bets={mockBets}/>).instance()
            expect(newInstance.state).toEqual({
              currentHeight: 0,
              sectionSelected: null
            })

            newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)

            expect(newInstance.state).toEqual({
              currentHeight: mockArguments.cardRef.scrollHeight,
              sectionSelected: mockArguments.id
            })
          })
        })
        describe('when the section selected has not changed', () => {
          it('should reset the state to the default one', () => {
            const mockArguments = {
              id: '0',
              cardRef: {
                scrollHeight: 10
              }
            }
            const newInstance = shallow(<Accordion bets={mockBets}/>).instance()
            expect(newInstance.state).toEqual({
              currentHeight: 0,
              sectionSelected: null
            })

            newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)

            expect(newInstance.state).toEqual({
              currentHeight: mockArguments.cardRef.scrollHeight,
              sectionSelected: mockArguments.id
            })

            newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)

            expect(newInstance.state).toEqual({
              currentHeight: 0,
              sectionSelected: null
            })
          })
        })
      })
    })
  })
})
