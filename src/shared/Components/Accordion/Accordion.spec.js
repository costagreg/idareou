import React from 'react'
import { shallow } from 'enzyme'

import Accordion from './Accordion'

const mockSections = [
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
        const component = shallow(<Accordion sections={mockSections}/>)
        const { onSelectSection } = component.instance()
        const accordionSections = component.find('AccordionSection')

        expect(accordionSections.length).toBe(mockSections.length)

        accordionSections.forEach((section, index) => {
          expect(section.props()).toEqual({
            id: mockSections[index].id,
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
            const newInstance = shallow(<Accordion sections={mockSections}/>).instance()
            expect(newInstance.state).toEqual({
              currentHeight: 0,
              sectionSelected: null,
              cardRef: null
            })

            newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)

            expect(newInstance.state).toEqual({
              currentHeight: mockArguments.cardRef.scrollHeight,
              sectionSelected: mockArguments.id,
              cardRef: mockArguments.cardRef
            })
          })
        })
        describe('when the section selected has not changed', () => {
          describe('and the height is the same as saved', () => {
            it('should reset the state to the default one', () => {
              const mockArguments = {
                id: '0',
                cardRef: {
                  scrollHeight: 10
                }
              }
              const newInstance = shallow(<Accordion sections={mockSections}/>).instance()
              expect(newInstance.state).toEqual({
                currentHeight: 0,
                sectionSelected: null,
                cardRef: null
              })
  
              newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)
  
              expect(newInstance.state).toEqual({
                currentHeight: mockArguments.cardRef.scrollHeight,
                sectionSelected: mockArguments.id,
                cardRef: mockArguments.cardRef
              })
  
              newInstance.onSelectSection(mockArguments.id, mockArguments.cardRef)
  
              expect(newInstance.state).toEqual({
                currentHeight: 0,
                sectionSelected: null,
                cardRef: null
              })
            })
          })
        })
      })
    })
  })
})
