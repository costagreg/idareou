import React, { Component } from 'react'
import Proptypes from 'prop-types'

import AccordionSection from './AccordionSection'

if(process.browser) {
  require('./Accordion.scss')
}

class Accordion extends Component {
  state = {
    currentHeight: 0,
    sectionSelected: null,
    cardRef: null
  }

  onSelectSection = (id, cardRef) => {
    if(id === this.state.sectionSelected && this.state.currentHeight === cardRef.scrollHeight) {
      this.setState({
        sectionSelected: null,
        currentHeight: 0,
        cardRef: null
      })
    } else {
      this.setState({
        currentHeight: cardRef.scrollHeight,
        sectionSelected: id,
        cardRef
      })
    }
  }

  resizeSection = () => {
    if(this.state.sectionSelected) {
      this.onSelectSection(this.state.sectionSelected, this.state.cardRef)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeSection)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeSection)
  }

  render() {
    const { sections = [], currentUser } = this.props
    return <div className="accordion">
      {
        sections.map(section =>
          <AccordionSection
            key={section._id}
            id={section._id}
            title={section.title}
            state={section.state}
            onSelectSection={this.onSelectSection}
            sectionSelected={this.state.sectionSelected}
            currentHeight={this.state.currentHeight}
            currentUser={currentUser}
            master={section.master}
          >
            {
              React.Children.map(this.props.children, child =>
                React.cloneElement(child, { ...section }))
            }
          </AccordionSection>)
      }
    </div>
  }
}

Accordion.propTypes = {
  sections: Proptypes.array,
  children: Proptypes.node.isRequired,
  currentUser: Proptypes.string
}

export default Accordion
