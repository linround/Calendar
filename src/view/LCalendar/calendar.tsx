import LCalendar from './index'
import { VisualContext } from './props/VisualContext'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/features/user/userSlice'
import { Navigate } from 'react-router-dom'

export function CalendarPage() {

  const user = useAppSelector(selectUser)
  return (
    <>
      {!user && <Navigate to='/' />}
      {user && <VisualContext value={{}}>
        <LCalendar />
      </VisualContext>}
    </>
  )
}
