import { useRoutes } from 'react-router-dom'
import Home from './view/Home'
import Calendar from './view/Calendar'
import Buttons from './view/Buttons'
import Loading from './view/Loading'
import Click from './view/Click'
import Icons from './view/Icons'
import LCalendar from './view/LCalendar'


















function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <LCalendar />,
    },
    {
      path: '/Home',
      element: <Home />,
    },
    {
      path: '/Icons',
      element: <Icons />,
    },
    {
      path: '/Calendar',
      element: <Calendar />,
    },
    {
      path: '/Buttons',
      element: <Buttons />,
    },
    {
      path: '/Loading',
      element: <Loading />,
    },
    {
      path: '/Click',
      element: <Click />,
    }
  ])
  return element
}

export default App
