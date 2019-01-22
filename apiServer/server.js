import express from 'express'
import expressGraphQL from 'express-graphql'
import dbConnection from './database/connection'
import routes from './routes'
import { RootQuery } from './graphql/schema'

const app = express()

const port = process.env.PORT || 3001

// Connect to DB
const dbUrl = process.env.ENV !== 'prod'
  ? process.env.LOCAL_DB_URL
  : process.env.REMOTE_DB_URL

dbConnection(dbUrl)

// Routes
routes(app)

// GraphQL 
app.use('/graphql', expressGraphQL({
  schema: RootQuery,
  graphiql: true
}))

// Catch any error
app.use((err, req, res) => {
  // console.log(err)
  // res.status(500).send('Something broke in my API')
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
