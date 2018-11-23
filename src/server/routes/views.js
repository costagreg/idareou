import { getAppRouter } from '../controllers/viewsController'

export const views = app => {
  // VIEWS
  app.route('*')
    .get(getAppRouter)
}