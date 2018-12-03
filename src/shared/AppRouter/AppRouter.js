import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Button } from '../Components/Common/Button'
import { TextArea } from '../Components/Common/TextArea'
import { TextInput } from '../Components/Common/TextInput'
import { FormContainer } from '../Containers/FormContainer'
import { PageTitle } from '../Components/Common/PageTitle'
import routes from './routes'

if (process.browser) {
  require('../../styles/global.scss')
}

const AppRouter = () => {
  return (
    <Fragment>
      <div className='container'>
        <FormContainer>
          <PageTitle title='Create a bet' />
          <TextInput placeholder='Title' />
          <TextArea placeholder='Description' />
          <Button text={'test'} disabled={true} />
        </FormContainer>
        <Switch>
          {
            routes.map(({ Component, path }, index) =>
              <Route
                key={index}
                exact
                path={path}
                component={Component}
              />)
          }
        </Switch>
      </div>
    </Fragment>
  )
}

export default AppRouter