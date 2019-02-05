import mongoose from 'mongoose'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'
import { User, Bet } from '../apiServer/database/models'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

beforeAll((done) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/idareyou_test')
  mongoose.connection
    .once('open', () => { done() })
    .on('error', err => {
      console.log(err)
    })
})
