import React, { Component } from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./FormContainer.scss')
}

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state)
    }
  }

  render() {
    const { children } = this.props

    return <form className='FormContainer' onSubmit={this.onSubmit}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onChange: this.onChange,
          value: this.state[child.props.name] || ''
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
