import HomePage from '../../Pages/HomePage'
import BetPage from '../../Pages/BetPage'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  }, {
    Component: BetPage,
    path: '/bet',
    exact: true,
    name: 'BetPage'
  }
]

export default routes
