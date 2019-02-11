import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressGraphQL from 'express-graphql'

import dbConnection from './database/connection'
import { RootQuery } from './graphql/schema'
import { auth } from './helpers/jwt'

const app = express()

const port = process.env.PORT || 3001

// Connect to DB
const dbUrl = process.env.ENV !== 'prod'
  ? process.env.LOCAL_DB_URL
  : process.env.REMOTE_DB_URL

dbConnection(dbUrl)

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}))
app.use(bodyParser.json())
app.use(cookieParser())
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
