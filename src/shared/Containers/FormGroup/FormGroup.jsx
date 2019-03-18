import React, { Component } from 'react'

export class FormGroup extends Component {
  state = {}

  updateValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { children } = this.props
    return <div className='FormGroup'>
      {React.Children.map(children, (child) => {
        const { props: { name: inputName, value: inputValue } } = child

        const newProps = {
          updateValue: this.updateValue,
          value: (inputName && this.state[inputName]) || inputValue
        }
        return React.cloneElement(child, newProps)
      })}
    </div>
  }
}
