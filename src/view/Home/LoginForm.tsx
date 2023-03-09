import styles from './style.module.less'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/features/user/userSlice'
import { AlertColor } from '@mui/material/Alert'
import { CommonMessage } from '../LCalendar/commonMessage/message'

interface IProps {
  setState:(s:string)=>void
}

export function LoginForm(props:IProps) {
  const { setState, } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userAccount, setUserAccount] = useState('')
  const [password, setPassword] = useState('')

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState<string>('注册成功')
  const [messageStatus, setMessageStatus] = useState<AlertColor>('success')

  function validate() {
    if (!userAccount) {
      setMessage('请输入账户')
      return false
    }
    if (!password) {
      setMessage('请输入密码')
      return false
    }
    return true
  }
  const onchange = (event:React.ChangeEvent<HTMLInputElement>, type:string) => {
    const value = event.target.value
    switch (type) {
    case 'userAccount':{
      setUserAccount(value)
      break
    }
    case 'password':{
      setPassword(value)
      break
    }
    default:{
      break
    }
    }
  }
  const onRegister = () => {
    setState('register')
  }
  const onLogin = () => {
    if (!validate()) {
      setMessageStatus('info')
      setShowMessage(true)
      return
    }
    const params = {
      userName: '',
      userAccount,
      password,
      userId: 0,
      avatarUrl: 'https://avatars.githubusercontent.com/u/44738166?v=4',
      userEmail: 'yuanlincuc@gmail.com',
    }
    dispatch(setUser(params))
    navigate('/calendar')
  }
  return (
    <>
      <CommonMessage
        severity={messageStatus}
        setOpen={setShowMessage}
        open={showMessage} >
        {message}</CommonMessage>
      <div className={styles.containerFormContainer}>
        <div className={styles.containerForm}>
          <TextField
            defaultValue={userAccount}
            className={styles.containerFormItem}
            placeholder='邮箱或手机号' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'userAccount') } />
          <TextField
            defaultValue={password}
            className={styles.containerFormItem}
            placeholder='密码' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'password') } />
          <Button
            onClick={onLogin}
            className={styles.containerFormItem}
            variant="contained"
            size="large">
            登录
          </Button>
          <div className={styles.containerFormForget}>
            <span className={styles.containerFormForgetText}>忘记密码？</span>
          </div>
        </div>
        <div className={styles.containerFormFooter}>
          <Button
            onClick={onRegister}
            variant="contained"
            color="success"
            size="large">
            新建账户
          </Button>
        </div>
      </div>
    </>
  )
}
