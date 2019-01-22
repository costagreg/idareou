import express from 'express'
import path from 'path'

import { views } from './views/views'

export default app => {
  // Assets
  app.use('/assets', express.static(path.resolve(__dirname, '../../../assets')))

  // User this ./dist because the publicPath is required in expressMiddleware
  app.use('/dist', express.static(path.resolve(__dirname, '../../../dist')))

  // VIEWS
  views(app)
}
