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
  }
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

  describe('checkAndSaveData', () => {
    it('sends form data to the backend', async () => {
      const formData = {
        username: 'username',
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword',
        monzouser: 'monzouser'
      }
      const props = {
        ...initProps
      }

      const component = shallow(<SignUpPageContainer {...props} />)
      await component.instance().checkAndSaveData(formData)

      expect(props.client.mutate).toHaveBeenCalledWith({
        mutation: addUser,
        variables: formData
      })
    })
    describe('if signup is successful', () => {
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
  })
})
