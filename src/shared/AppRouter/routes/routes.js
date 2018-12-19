import HomePage from '../../Pages/HomePage'
import History from '../../Pages/History'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  },
  {
    Component: History,
    path: '/history',
    name: 'History'
  }
]

export default routes
