import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormContainer extends Component {
  state = {}

  updateValue = (name, value, error) => {
    this.setState({ [name]: {
      value,
      error
    } })
  }

  isConfirmSuccess = ({ name, value, type }) => {
    return name === 'confirmPassword' || name === 'confirmEmail'
      ? this.state[type].value === value
      : true
  }

  itHasErrors = listOfElements => {
    const arrayOfElements = Array.from(listOfElements)

    return !!arrayOfElements.reduce((errors, element) => {
      if(element.name && element.name.length > 0) {
        const error = element.checkValidity() && this.isConfirmSuccess(element) ? 0 : 1
        errors += error
        this.updateValue(element.name, element.value, !!error ? 'error' : 'success')
      }
      return errors
    }, 0)
  }

  onSubmit = (event) => {
    event.preventDefault()

    if(this.props.onSubmit && !this.itHasErrors(event.target.elements)) {
      this.props.onSubmit(this.state)
    }
  }

  render() {
    const { children } = this.props

    return <form className='FormContainer' onSubmit={this.onSubmit} noValidate>
      {React.Children.map(children, (child) => {
        const { props: { name: inputName, value: inputValue } } = child
        return React.cloneElement(child, {
          updateValue: this.updateValue,
          value: inputName && (this.state[inputName] || {}).value || inputValue,
          error: inputName && (this.state[inputName] || {}).error
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
