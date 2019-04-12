import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressGraphQL from 'express-graphql'
import jwt from 'express-jwt'

import dbConnection from './database/connection'
import { schema } from './graphql/schema'
import { auth } from './helpers/jwt'

const app = express()

const port = process.env.API_PORT

const dbUrl = process.env.ENV !== 'prod'
  ? process.env.LOCAL_DB_URL
  : process.env.REMOTE_DB_URL

dbConnection(dbUrl)

app.use(cors({
  credentials: true,
  origin: process.env.DEV_HOST // ALWAYS FROM DEV SERVER
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
  next()
})

app.use(auth)

app.use('/graphql', expressGraphQL((req, res) => ({
  schema,
  graphiql: true,
  context: { req, res },
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path
  })
})))

app.use((err, req, res, next) => {
  if(err.status === 401) {
    res.status(401)
    res.cookie('token', 0, { maxAge: 0 }) // Only for Client side calls
    res.send(err)
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
