import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FormContainer extends Component {
  state = {}

  updateValue = (name, value, error) => {
    this.setState({
      [name]: {
        value,
        error
      }
    })
  }

  updateError = (name, error) => {
    this.setState({
      [name]: {
        ...this.state[name],
        error
      }
    })
  }

  isConfirmSuccess = ({ name, value, type }) => {
    return name === 'confirmPassword' || name === 'confirmEmail'
      ? this.state[type].value === value
      : true
  }

  itHasErrors = listOfElements => {
    const arrayOfElements = Array.from(listOfElements)

    return !!arrayOfElements.reduce((errors, element) => {
      if (element.name && element.name.length > 0) {
        const error = element.checkValidity() && this.isConfirmSuccess(element) ? 0 : 1
        errors += error
        this.updateValue(element.name, element.value, !!error ? 'STANDARD_ERROR' : '')
      }
      return errors
    }, 0)
  }

  getValues = (obj) => {
    return Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: obj[key].value }), {})
  }

  onSubmit = (event) => {
    event.preventDefault()

    if (this.props.onSubmit && !this.itHasErrors(event.target.elements)) {
      this.props.onSubmit(this.getValues(this.state), this.updateError)
    }
  }

  removeFromState = (inputName) => {
    this.setState({
      [inputName]: undefined
    })
  }

  render() {
    const { children } = this.props

    return <form className='FormContainer' onSubmit={this.onSubmit} noValidate>
      {React.Children.map(children, (child) => {
        if (child) {
          const isReactComponent = child.type && typeof child.type === 'function'
          const { props: { name: inputName, value: inputValue, error: inputError } } = child

          const newProps = {
            updateValue: this.updateValue,
            value: (inputName && (this.state[inputName] || {}).value) || inputValue,
            error: inputError || (inputName && (this.state[inputName] || {}).error),
            removeFromState: this.removeFromState
          }

          return isReactComponent ? React.cloneElement(child, newProps) : child
        }
      })}
    </form>
  }
}

FormContainer.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  updateForm: PropTypes.func
}

export default FormContainer
