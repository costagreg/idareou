import React, { Component } from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./AmountInput.scss')
}

class AmountInput extends Component {
  incrementAmount = () => {
    const { name, value, updateValue } = this.props
    const updatedValue = parseFloat(value) + 0.5
    updateValue(name, updatedValue.toFixed(2))
  }

  decrementAmount = () => {
    const { name, value, updateValue } = this.props
    const updatedValue = parseFloat(value) - 0.5
    updateValue(name, updatedValue > 0 ? updatedValue.toFixed(2) : '0.00')
  }

  render() {
    const { name, value, updateValue } = this.props
    return <div className='AmountInput'>
      <button
        className='AmountInput__Button'
        type='button'
        onClick={this.decrementAmount}>
        -
      </button>
      <input
        name={name}
        type='number'
        className='AmountInput__TextInput'
        value={value}
        onChange={(e) => { updateValue(name, e.target.value) }}
      />
      <button
        className='AmountInput__Button'
        type='button'
        onClick={this.incrementAmount}>
        +
      </button>
    </div>
  }
}
AmountInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func
}

AmountInput.defaultProps = {
  value: '0.00'
}

export default AmountInput
