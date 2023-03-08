import { useRoutes } from 'react-router-dom'
import Home from './view/Home'
import Icons from './view/Icons'
import LCalendar from './view/LCalendar'
import { VisualContext } from './view/LCalendar/props/VisualContext'


















function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/Calendar',
      element: (
        <VisualContext value={{}}>
          <LCalendar></LCalendar>
        </VisualContext>
      ),
    },
    {
      path: '/Icons',
      element: <Icons />,
    }
  ])
  return element
}

export default App
