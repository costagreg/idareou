import mongoose from 'mongoose'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

beforeAll((done) => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/idareyou_test', { useNewUrlParser: true })
  mongoose.connection
    .once('open', () => { done() })
    .on('error', err => {
      console.log(err)
    })
})

beforeEach((done) => {
  mongoose.connection.db.dropDatabase(done)
})

process.env = {
  JWT_SECRET: 'asdsd'
}

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done)
  })
})
