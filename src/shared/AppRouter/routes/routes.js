import HomePage from '~src/shared/Pages/HomePage'
import HistoryPageContainer from '~src/shared/Containers/HistoryPageContainer'
import BetPage from '~src/shared/Pages/BetPage'
import LoginPage from '~src/shared/Pages/LoginPage'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  },
  {
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
  }
]

export default routes
