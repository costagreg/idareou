import React from 'react'
import { shallow } from 'enzyme'

import { LoginPageContainer } from './LoginPageContainer'
import { loginUser, currentUser } from '~src/shared/graphql/queries'

describe('LoginPageContainer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('renders', () => {
    it('renders a form', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('FormContainer').length).toBe(1)
    })
    it('renders a textinput for email', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('TextInput[name="email"]').exists()).toBe(true)
    })
    it('renders a textinput for password', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('TextInput[name="password"]').exists()).toBe(true)
    })
    it('renders a textinput a submit button', () => {
      const component = shallow(<LoginPageContainer />)

      expect(component.find('Button').exists()).toBe(true)
    })
  })
  describe('checkUser', () => {
    it('send login details to the backend', () => {
      const props = {
        client: {
          mutate: jest.fn()
        }
      }
      const formData = {
        email: 'emailMock',
        password: 'passwordMock'
      }

      const component = shallow(<LoginPageContainer {...props} />)
      component.instance().checkUser(formData)

      expect(props.client.mutate).toHaveBeenCalledWith({ mutation: loginUser, variables: formData })
    })

    describe('login is positive', () => {
      it('refetches the currentUser and redirect to dashboard', async () => {
        const props = {
          client: {
            mutate: () => ({ data: { login: { token: 'tokenmock' } } }),
            query: jest.fn(() => ({ data: { currentUser: {} } }))
          },
          history: {
            push: jest.fn()
          }
        }
        const formData = {
          email: 'emailMock',
          password: 'passwordMock'
        }

        const component = shallow(<LoginPageContainer {...props} />)
        await component.instance().checkUser(formData)

        expect(props.client.query).toHaveBeenCalledWith({
          query: currentUser,
          fetchPolicy: 'network-only'
        })
        expect(props.history.push).toHaveBeenCalledWith('/dashboard')
      })
    })
  })
})
