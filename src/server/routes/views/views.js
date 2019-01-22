import { getAppRouter } from '~src/server/controllers/viewsController'

export const views = app => {
  // VIEWS
  app.route('*')
    .get(getAppRouter)
}
