import React, { Component } from 'react'
import Proptypes from 'prop-types'

import AccordionSection from './AccordionSection'

if(process.browser) {
  require('./Accordion.scss')
}

class Accordion extends Component {
  state = {
    currentHeight: 0,
    sectionSelected: null
  }

  onSelectSection = (id, cardRef) => {
    if(id === this.state.sectionSelected) {
      this.setState({
        sectionSelected: null,
        currentHeight: 0
      })
    } else {
      this.setState({
        currentHeight: cardRef.scrollHeight,
        sectionSelected: id
      })
    }
  }

  render() {
    const { sections = [] } = this.props

    return <div className="accordion">
      {
        sections.map(section =>
          <AccordionSection
            key={section.id}
            id={section.id}
            title={section.title}
            state={section.state}
            onSelectSection={this.onSelectSection}
            sectionSelected={this.state.sectionSelected}
            currentHeight={this.state.currentHeight}
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
  children: Proptypes.node.isRequired
}

export default Accordion
