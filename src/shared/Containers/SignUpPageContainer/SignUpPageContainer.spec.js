import React from 'react'
import { shallow } from 'enzyme'

import { SignUpPageContainer } from './SignUpPageContainer'
import { addUser, currentUser } from '~src/shared/graphql/queries'

describe('given SignUpPageContainer component', () => {
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
    it('sends form data to the backend', () => {
      const props = {
        client: {
          mutate: jest.fn()
        }
      }
      const formData = {
        username: 'username',
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword',
        monzouser: 'monzouser'
      }

      const component = shallow(<SignUpPageContainer {...props} />)
      component.instance().checkAndSaveData(formData)

      expect(props.client.mutate).toHaveBeenCalledWith({
        mutation: addUser,
        variables: formData
      })
    })
    describe('if signup is successful', () => {
      it('refetches the currentUser and redirect to dashboard', async () => {
        const props = {
          client: {
            mutate: () => ({ data: { addUser: { _id: 'idmock' } } }),
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
