import HomePage from '../../Pages/HomePage'
import BetPage from '../../Pages/BetPage'
import LoginPage from '../../Pages/LoginPage'

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
    name: 'Bet'
  }, {
    Component: LoginPage,
    path: '/login',
    exact: true,
    name: 'Login'
  }
]

export default routes
