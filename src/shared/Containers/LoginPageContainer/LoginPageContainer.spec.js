import React from 'react'
import { shallow } from 'enzyme'

import { LoginPageContainer } from './LoginPageContainer'
import { loginUser, currentUser } from '~src/shared/graphql/queries'

const initProps = {
  client: {
    mutate: jest.fn(() => ({ data: { login: { token: 'tokenmock' } } })),
    query: jest.fn(() => ({ data: { currentUser: {} } }))
  },
  history: {
    push: jest.fn()
  },
  location: {}
}

describe('LoginPageContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    const formData = {
      email: 'emailMock',
      password: 'passwordMock'
    }

    it('send login details to the backend', async () => {
      const props = {
        ...initProps
      }

      const component = shallow(<LoginPageContainer {...props} />)
      await component.instance().checkUser(formData)

      expect(props.client.mutate).toHaveBeenCalledWith({ mutation: loginUser, variables: formData })
    })

    describe('login is positive', () => {
      describe('and the location object not provide where to redirect', () => {
        it('refetches the currentUser and redirect to dashboard', async () => {
          const props = {
            ...initProps
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

      describe('and the location object provide where to redirect', () => {
        it('refetches the currentUser and redirect to dashboard', async () => {
          const props = {
            ...initProps,
            location: {
              state: { from: '/bet' }
            }
          }
  
          const component = shallow(<LoginPageContainer {...props} />)
          await component.instance().checkUser(formData)
  
          expect(props.client.query).toHaveBeenCalledWith({
            query: currentUser,
            fetchPolicy: 'network-only'
          })
          expect(props.history.push).toHaveBeenCalledWith('/bet')
        })
      })
    })

    describe('login is wrong', () => {
      it('changes error status to true', async () => {
        const mockUpdateError = jest.fn()
        const props = {
          client: {
            mutate: () => ({ data: {} }),
            query: jest.fn(() => ({ data: { currentUser: {} } }))
          },
          history: {
            push: jest.fn()
          }
        }

        const component = shallow(<LoginPageContainer {...props} />)
        await component.instance().checkUser(formData, mockUpdateError)

        expect(mockUpdateError).toHaveBeenCalledWith('password', 'Your username/password is wrong')
      })
    })
  })
})
