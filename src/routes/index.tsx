import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../view/Home'
import { RootPage } from '../view/Root'
import { CalendarPage } from '../view/LCalendar/calendar'
import { ErrorPage } from '../view/ErrorPage'
import { Init } from '../view/Init/Init'
import { V2OutSideSource } from '../view/LCalendar/v2/OutSideSource'
import { V3Calendar } from '../view/LCalendar/v3/V3Calendar'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage/>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, },
      { path: 'calendar',  element: <CalendarPage />, },
      { path: 'v2Calendar', element: <V2OutSideSource />, },
      { path: 'v3Calendar', element: <V3Calendar />, }
    ],
  },
  {
    path: '/Init',
    element: <Init />,
  }
])
