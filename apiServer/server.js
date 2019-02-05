import express from 'express'
import expressGraphQL from 'express-graphql'
import bodyParser from'body-parser'
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

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use('/graphql', expressGraphQL({
  schema: RootQuery,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
