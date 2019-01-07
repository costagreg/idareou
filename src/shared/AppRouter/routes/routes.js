import HomePage from '../../Pages/HomePage'
import HistoryPageContainer from '../../Containers/HistoryPageContainer'

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
  }
]

export default routes
