import HomePage from '../../Pages/HomePage'
import HistoryPageContainer from '../../Containers/HistoryPageContainer'
import BetPage from '../../Pages/BetPage'

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
    name: 'BetPage'
  }
]

export default routes
