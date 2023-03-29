import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../view/Home'
import { RootPage } from '../view/Root'
import { CalendarPage } from '../view/LCalendar/calendar'
import { ErrorPage } from '../view/ErrorPage'
import { Init } from '../view/Init/Init'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage/>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, },
      { path: 'calendar',  element: <CalendarPage />, }
    ],
  },
  {
    path: '/Init',
    element: <Init />,
  }
])
