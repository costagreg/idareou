import { createNewUser } from '../controllers/api/userControllers'

export default app => {
  app.route('/api/createnewuser')
    .get(createNewUser)
}