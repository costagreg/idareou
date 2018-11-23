import React, { Component } from 'react'

import deviceTypes from '../../helpers/deviceTypes'
import debouncer from '../../helpers/debouncer'

const { Provider, Consumer } = React.createContext()

export class ContextContainer extends Component {
  constructor(props) {
    super(props)
    this.desktopViews = ['laptop', 'desktop']
    this.state = {
      isDesktop: props.isDesktop
    }
  }

  setView = event => {
    const { innerWidth } = event.target

    for(const [device, { min, max }] of Object.entries(deviceTypes.breakpoints)) {
      if(min <= innerWidth && max >= innerWidth) {
        this.setState({
          isDesktop: this.desktopViews.includes(device)
        })
      }
     }
  }

  componentDidMount() {
    if(window) {
      window.addEventListener('resize', debouncer(this.setView, 200))
    }
  }

  componentWillUnmount() {
    if(window) {
      window.removeEventListener('resize', debouncer(this.setView, 200))
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        { this.props.children }
      </Provider>
    )
  }
}

export default Consumer