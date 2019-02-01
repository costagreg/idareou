import mongoose from 'mongoose'

async function clearDatabase() {
  mongoose.Promise = global.Promise
  await mongoose.connect(
    'mongodb://admin:idareou123@ds155823.mlab.com:55823/idareou',
    { useNewUrlParser: true }
  )
  await mongoose.connection.db.dropDatabase()
}

export async function setupTest() {
  await clearDatabase()
}
