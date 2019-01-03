import React, { Component } from 'react'
import PropTypes from 'prop-types'

if (process.browser) {
  require('./AmountInput.scss')
}

class AmountInput extends Component {
  onChangeValue = (action) => {
    const { name, value, updateValue } = this.props
    let updatedValue = parseFloat(value)

    switch (action) {
      case 'increment':
        updatedValue += 0.5
        break
      case 'decrement':
        updatedValue -= 0.5
        break
      default:
    }
    updateValue(name, updatedValue > 0 ? updatedValue.toFixed(2) : '0.00')
  }

  render() {
    const { name, value, updateValue } = this.props
    return <div className='AmountInput'>
      <button
        className='AmountInput__Button'
        type='button'
        onClick={() => this.onChangeValue('decrement')}>
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
        onClick={() => this.onChangeValue('increment')}>
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
