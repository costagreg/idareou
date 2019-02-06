import HomePage from '~src/shared/Pages/HomePage'
import HistoryPageContainer from '~src/shared/Containers/HistoryPageContainer'
import BetPage from '~src/shared/Pages/BetPage'
import LoginPage from '~src/shared/Pages/LoginPage'
import SignUpPage from '~src/shared/Pages/SignUpPage'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  }, {
    Component: HistoryPageContainer,
    path: '/history',
    name: 'History',
    auth: true
  }, {
    Component: BetPage,
    path: '/bet',
    exact: true,
    name: 'Bet',
    auth: true
  }, {
    Component: LoginPage,
    path: '/login',
    exact: true,
    name: 'Login',
    auth: false
  }, {
    Component: SignUpPage,
    path: '/signup',
    exact: true,
    name: 'Signup',
    auth: false
  }
]

export default routes
