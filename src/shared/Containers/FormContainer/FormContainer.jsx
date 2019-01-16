import React, { Component } from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./FormContainer.scss')
}

class FormContainer extends Component {
  updateValue = (name, value) => {
    this.setState({ [name]: value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    if(this.props.onSubmit) {
      this.props.onSubmit(this.state)
    }
  }

  render() {
    const { children } = this.props

    return <form className='FormContainer' onSubmit={this.onSubmit}>
      {React.Children.map(children, (child) => {
        const { props: { name: inputName, value: inputValue } } = child
        return React.cloneElement(child, {
          updateValue: this.updateValue,
          value: inputName && this.state && this.state[inputName] || inputValue
        })
      })}
    </form>
  }
}

FormContainer.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

export default FormContainer
