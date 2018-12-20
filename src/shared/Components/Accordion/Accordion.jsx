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
    const { bets = [] } = this.props

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
