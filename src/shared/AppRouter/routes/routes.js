import HomePage from '../../Pages/HomePage'
import HistoryPageContainer from '../../Containers/HistoryPageContainer'
import BetPage from '../../Pages/BetPage'
import LoginPage from '../../Pages/LoginPage'
import SignUpPage from '../../Pages/SignUpPage'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  }, {
    Component: HistoryPageContainer,
    path: '/history',
    name: 'History'
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
  }, {
    Component: SignUpPage,
    path: '/signup',
    exact: true,
    name: 'Signup'
  }
]

export default routes
