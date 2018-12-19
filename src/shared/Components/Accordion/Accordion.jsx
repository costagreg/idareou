import React, { Component } from 'react'
import Proptypes from 'prop-types'

import AccordionSection from './AccordionSection'

if(process.browser) {
  require('./Accordion.scss')
}

class Accordion extends Component {
  state = {}

  isSelected(id) {
    return id === this.state.sectionSelected
  }

  onSelectSection = (id, cardRef) => {
    if(this.isSelected(id)) {
      this.setState({
        sectionSelected: null
      })
    } else {
      this.setState({
        currentHeight: cardRef.scrollHeight,
        sectionSelected: id
      })
    }
  }

  render() {
    const { bets } = this.props

    return <div className="accordion">
      {
        bets.map(bet =>
          <AccordionSection
            key={bet.id}
            {...bet}
            onSelectSection={this.onSelectSection}
            sectionSelected={this.state.sectionSelected}
            currentHeight={this.state.currentHeight}
            />)
      }
    </div>
  }
}

AccordionSection.propTypes = {
  bets: Proptypes.array
}

export default Accordion
