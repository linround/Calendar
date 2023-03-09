import {
  Outlet, useRoutes, useNavigate
} from 'react-router-dom'
import { HomePage } from './view/Home'
import Icons from './view/Icons'
import { CalendarPage } from './view/LCalendar/calendar'
import { useAppSelector } from './store/hooks'
import { selectUser } from './store/features/user/userSlice'
import React, { useEffect } from 'react'
import { ErrorPage } from './view/ErrorPage'













function Index() {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate('/')
  }, [user])
  return (
    <>
      <Outlet />
    </>
  )
}




function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Index />,
      errorElement: <ErrorPage />,
      children: [
        { index: true,  element: <HomePage />, },
        {
          path: 'calendar',
          element: <CalendarPage />,
        },
        {
          path: 'icons',
          element: <Icons />,
        }
      ],
    }



  ])
  return element
}

export default function AppComponent() {

  return (
    <App />
  )
}
