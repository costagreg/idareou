import express from 'express'
import expressGraphQL from 'express-graphql'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import cors from 'cors'
import dbConnection from './database/connection'
import { RootQuery } from './graphql/schema'

const app = express()

const port = process.env.PORT || 3001

// Connect to DB
const dbUrl = process.env.ENV !== 'prod'
  ? process.env.LOCAL_DB_URL
  : process.env.REMOTE_DB_URL

dbConnection(dbUrl)

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    }
    if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  }
})

app.use(cors({ credentials: true, origin: 'http://local.idareyou.com:3000' }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  next()
})
app.use('/graphql', auth, expressGraphQL((req, res) => ({
  schema: RootQuery,
  graphiql: true,
  context: { req, res }
})))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
