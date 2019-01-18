import express from 'express'
import path from 'path'
// import proxy from 'http-proxy-middleware'

import routes from './routes'

const app = express()

// Proxy
// app.use('/api', proxy(
//   {
//     target: process.env.ENV !== 'prod' ? process.env.API_URL : process.env.API_URL,
//     changeOrigin: true
//   }
// ))

const port = process.env.PORT || 3000

if(process.env.ENV !== 'prod') {
  require('./middleware/expressMiddleware').default(app)
}

// Assets
app.use('/assets', express.static('~assets/'))

// User this ./dist because the publicPath is required in expressMiddleware
app.use('/dist', express.static('~dist'))

// Routes
routes(app)

// Catch any error
app.use((err, req, res, _) => {
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
