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
app.use((err, req, res, next) => {
  if(err.networkError.statusCode === 401) {
    return res.cookie('token', 0, { maxAge: 0 }).redirect('/login')
  }
  res.status(500).send(err)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
