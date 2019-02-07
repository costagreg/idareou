import express from 'express'

import routes from './routes/routes'

const app = express()

const port = process.env.SSR_PORT

if(process.env.ENV !== 'prod') {
  require('./middleware/expressMiddleware').default(app)
}

// Routes
routes(app)

// Catch any error
app.use((err, req, res) => {
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
