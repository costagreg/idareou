import express from 'express'

import routes from './routes/routes'

const app = express()

const port = process.env.PORT || 3000

if(process.env.ENV !== 'prod') {
  require('./middleware/expressMiddleware').default(app)
}

// Routes
routes(app)

// Catch any error
app.use((err, req, res, _) => {
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
