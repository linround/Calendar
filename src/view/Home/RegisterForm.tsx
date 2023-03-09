import styles from './style.module.less'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { CommonMessage } from '../LCalendar/commonMessage/message'
import { AlertColor } from '@mui/material/Alert'

interface IProps {
  setState:(s:string)=>void
}

export function RegisterForm(props:IProps) {
  const { setState, } = props
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [showMessage, setShowMessage] = useState(true)
  const [message, setMessage] = useState<string>('注册成功')
  const [messageStatus, setMessageStatus] = useState<AlertColor>('success')
  const onchange = (event:React.ChangeEvent<HTMLInputElement>, type:string) => {
    const value = event.target.value
    switch (type) {
    case 'userName':{
      setUserName(value)
      break
    }
    case 'password':{
      setPassword(value)
      break
    }
    case 'repeat':{
      setRepeat(value)
      break
    }
    default:{
      break
    }
    }
  }
  const onRegister = () => {
    const params = {
      userName,
      password,
      userId: 0,
      avatarUrl: 'https://avatars.githubusercontent.com/u/44738166?v=4',
      userEmail: 'yuanlincuc@gmail.com',
    }
    console.log(params)
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
            defaultValue={userName}
            className={styles.containerFormItem}
            placeholder='邮箱或手机号' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'userName') } />
          <TextField
            defaultValue={password}
            className={styles.containerFormItem}
            placeholder='密码' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'password') } />
          <TextField
            defaultValue={repeat}
            className={styles.containerFormItem}
            placeholder='确认密码' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'repeat') } />
          <Button
            onClick={onRegister}
            className={styles.containerFormItem}
            variant="contained"
            color="success"
            size="large">
            注册
          </Button>
          <div className={styles.containerFormForget}>
            <span
              onClick={() => setState('login')}
              className={styles.containerFormForgetText}>有账户了？</span>
          </div>
        </div>
        <div className={styles.containerFormFooter}>
        </div>
      </div>
    </>

  )
}
