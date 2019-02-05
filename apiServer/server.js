import express from 'express'
import expressGraphQL from 'express-graphql'
import bodyParser from 'body-parser'
import cors from 'cors'
import dbConnection from './database/connection'
import { RootQuery } from './graphql/schema'
import jwt from 'express-jwt'

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
  getToken: function fromHeaderOrQuerystring (req) {
    // here get token froom cookie
  }
})

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
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
