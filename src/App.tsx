import { useRoutes } from 'react-router-dom'
import Home from './view/Home'
import Calendar from './view/Calendar'
import Buttons from './view/Buttons'
import Loading from './view/Loading'
import Click from './view/Click'
import Icons from './view/Icons'
import LCalendar from './view/LCalendar'
import { LibraryComponent } from './view/Library'
import { VisualContext } from './view/LCalendar/props/VisualContext'


















function App() {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <VisualContext value={{}}>
          <LCalendar></LCalendar>
        </VisualContext>
      ),
    },
    {
      path: '/LibraryComponent',
      element: <LibraryComponent />,
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
