import HomePage from '~src/shared/Pages/HomePage'
import HistoryPage from '~src/shared/Pages/HistoryPage'
import BetPage from '~src/shared/Pages/BetPage'
import LoginPage from '~src/shared/Pages/LoginPage'
import SignUpPage from '~src/shared/Pages/SignUpPage'
import LogoutPage from '~src/shared/Pages/LogoutPage'
import DashboardPage from '~src/shared/Pages/Dashboard'
import BetLinkPageContainer from '~src/shared/Containers/BetLinkPageContainer'
import BetAdminPage from '~src/shared/Pages/BetAdminPage'
import JoinBetPage from '~src/shared/Pages/JoinBetPage'

const routes = [
  {
    Component: HomePage,
    path: '/',
    exact: true,
    name: 'Home'
  }, {
    Component: DashboardPage,
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    needAuthentication: true
  }, {
    Component: HistoryPage,
    path: '/history',
    name: 'History',
    needAuthentication: true
  }, {
    Component: BetPage,
    path: '/bet',
    exact: true,
    name: 'Bet',
    needAuthentication: true
  }, {
    Component: LoginPage,
    path: '/login',
    exact: true,
    name: 'Login',
    needAuthentication: false
  }, {
    Component: SignUpPage,
    path: '/signup',
    exact: true,
    name: 'Signup',
    needAuthentication: false
  }, {
    Component: JoinBetPage,
    path: '/invite/:id',
    exact: true,
    name: 'Join Bet',
    needAuthentication: true,
    hideRoute: true
  }, {
    Component: LogoutPage,
    path: '/logout',
    exact: true,
    name: 'Logout',
    needAuthentication: true
  }, {
    Component: BetLinkPageContainer,
    path: '/sharelink/:id',
    name: 'BetLinkPageContainer',
    needAuthentication: true,
    hideRoute: true
  }, {
    Component: BetAdminPage,
    path: '/bet/:id',
    name: 'BetAdminPage',
    needAuthentication: true,
    hideRoute: true
  }
]

export default routes
