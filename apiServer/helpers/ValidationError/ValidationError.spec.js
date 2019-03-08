import ValidationError from './ValidationError'

describe('ValidationError', () => {
  it('converts GraphQl Errors to an array', () => {
    const errors = [
      { key: 'username', message: 'username is wrong' },
      { key: 'email', message: 'email is wrong' },
      { key: 'email', message: 'email already exists' }
    ]
    const instance = new ValidationError(errors)
    const expected = {
      username: ['username is wrong'],
      email: ['email is wrong', 'email already exists']
    }

    expect(instance.state).toEqual(expected)
  })
})
