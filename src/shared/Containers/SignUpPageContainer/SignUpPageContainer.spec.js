import React from 'react'
import { shallow } from 'enzyme'

import { SignUpPageContainer } from './SignUpPageContainer'
import { addUser, currentUser } from '~src/shared/graphql/queries'

const initProps = {
  client: {
    mutate: jest.fn(() => ({ data: { addUser: { _id: 'idmock' } } })),
    query: jest.fn(() => ({ data: { currentUser: {} } }))
  },
  history: {
    push: jest.fn(() => {})
  },
  location: {}
}

describe('given SignUpPageContainer component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when trying to render the SignUpPageContainer component', () => {
    const component = shallow(<SignUpPageContainer />)

    it('should render the SignUpPageContainer component', () => {
      expect(component.length).toBe(1)
    })
    it('should render the FormContainer component', () => {
      expect(component.find('FormContainer').length).toBe(1)
    })
    it('should render the TextInputs', () => {
      expect(component.find('TextInput').length).toBe(5)
    })
    it('should render the Button', () => {
      expect(component.find('Button').length).toBe(1)
    })
  })

  describe('showErrors', () => {
    it('update the FormContainer with the latest errors from the server', () => {
      const mockUpdateError = jest.fn(() => { })
      const props = {
        updateError: mockUpdateError
      }
      const component = shallow(<SignUpPageContainer {...props} />)
      const mockResponse = {
        errors: [
          {
            state: {
              mockField1: 'mockFieldMessage1',
              mockField2: 'mockFieldMessage2'
            }
          }
        ]
      }
      component.instance().showErrors(mockResponse.errors, mockUpdateError)

      expect(mockUpdateError).toHaveBeenCalledWith('mockField1', 'mockFieldMessage1')
      expect(mockUpdateError).toHaveBeenCalledWith('mockField2', 'mockFieldMessage2')
    })
  })
  describe('checkAndSaveData', () => {
    it('sends form data to the backend', async () => { // TODO: GREG CHANGE IT PLEASE
      const updateError = jest.fn()
      const formData = {
        username: 'username',
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword',
        monzouser: 'monzouser'
      }

      const component = shallow(<SignUpPageContainer {...initProps} />)
      await component.instance().checkAndSaveData(formData)

      component.instance().checkAndSaveData(formData, updateError)

      expect(initProps.client.mutate).toHaveBeenCalledWith({
        mutation: addUser,
        variables: formData,
        errorPolicy: 'all'
      })
      expect(updateError).not.toHaveBeenCalled()
    })
    describe('if signup is successful', () => {
      describe('and the location object non provide where to redirect', () => {
        it('refetches the currentUser and redirect to dashboard', async () => {
          const formData = {
            email: 'emailMock',
            password: 'passwordMock'
          }
          const props = {
            ...initProps
          }

          const component = shallow(<SignUpPageContainer {...props} />)
          await component.instance().checkAndSaveData(formData)

          expect(props.client.query).toHaveBeenCalledWith({
            query: currentUser,
            fetchPolicy: 'network-only'
          })
          expect(props.history.push).toHaveBeenCalledWith('/dashboard')
        })
      })
      describe('and the location object provide where to redirect', () => {
        it('refetches the currentUser and redirect to dashboard', async () => {
          const formData = {
            email: 'emailMock',
            password: 'passwordMock'
          }
          const props = {
            ...initProps,
            location: {
              state: { from: '/bet' }
            }
          }

          const component = shallow(<SignUpPageContainer {...props} />)
          await component.instance().checkAndSaveData(formData)

          expect(props.client.query).toHaveBeenCalledWith({
            query: currentUser,
            fetchPolicy: 'network-only'
          })
          expect(props.history.push).toHaveBeenCalledWith('/bet')
        })
      })
    })
    describe('if signup is not successful', () => {
      it('shows the errors', async () => {
        const mockShowErrors = jest.fn()
        const mockUpdateError = jest.fn()
        const mockError = [{
          state: {
            mockField1: 'mockFieldMessage1',
            mockField2: 'mockFieldMessage2'
          }
        }]
        const formData = {
          email: 'emailMock',
          password: 'passwordMock'
        }
        const props = {
          client: {
            mutate: () => ({ data: {}, errors: mockError })
          }
        }

        const component = shallow(<SignUpPageContainer {...props} />)
        component.instance().showErrors = mockShowErrors
        await component.instance().checkAndSaveData(formData, mockUpdateError)

        expect(mockShowErrors).toHaveBeenCalledWith(mockError, mockUpdateError)
      })
    })
  })
})
