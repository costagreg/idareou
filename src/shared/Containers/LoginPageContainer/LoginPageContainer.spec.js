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
    const component = shallow(<LoginPageContainer  {...initProps}/>)
    it('renders a form', () => {
      expect(component.find('FormContainer').length).toBe(1)
    })
    it('renders a textinput for email', () => {
      expect(component.find('TextInput[name="email"]').exists()).toBe(true)
    })
    it('renders a textinput for password', () => {
      expect(component.find('TextInput[name="password"]').exists()).toBe(true)
    })
    it('renders a textinput a submit button', () => {
      expect(component.find('Button').exists()).toBe(true)
    })
    it('should render the SignUp msg', () => {
      expect(component.find('.LoginPage__Msg').exists()).toBe(true)
    })
  })
  describe('when the sign up link is clicked', () => {
    describe('if state is not passed by location to redirect back', () => {
      const component = shallow(<LoginPageContainer  {...initProps}/>)
      it('should redirect to signup page with no state', () => {
        const expected = {
          pathname: '/signup',
          state: { from: undefined }
        }
        expect(component.find('.LoginPage__Msg Link').props().to).toEqual(expected)
      })
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
          ...initProps,
          client: {
            mutate: () => ({ data: {} }),
            query: jest.fn(() => ({ data: { currentUser: {} } }))
          }
        }

        const component = shallow(<LoginPageContainer {...props} />)
        await component.instance().checkUser(formData, mockUpdateError)

        expect(mockUpdateError).toHaveBeenCalledWith('password', 'Your username/password is wrong')
      })
    })
  })
})
