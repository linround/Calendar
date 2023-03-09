import React, { useState } from 'react'
import styles from './style.module.less'
import SvgIcon from '../../components/SvgIcon'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/features/user/userSlice'
import { Navigate } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'



export function HomePage () {
  const user = useAppSelector(selectUser)
  const [state, setState] = useState('login')
  return (
    <>
      {user && <Navigate to='calendar'/>}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <SvgIcon iconName='UCalendar'></SvgIcon>
          {
            state === 'login' ?
              <LoginForm setState={setState} /> :
              <RegisterForm setState={setState} />
          }
        </div>
        <div className={styles.containerCopyright}>
          <div>ucalendar@2023</div>
          <div>yuanlincuc@gmail.com</div>
        </div>
      </div>
    </>

  )
}
