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
  const [userAccount, setUserAccount] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState<string>('注册成功')
  const [messageStatus, setMessageStatus] = useState<AlertColor>('success')
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
    case 'repeat':{
      setRepeat(value)
      break
    }
    default:{
      break
    }
    }
  }

  function validate() {
    if (!userAccount) {
      setMessage('请输入账户')
      return false
    }
    if (!password) {
      setMessage('请输入密码')
      return false
    }
    if (!repeat) {
      setMessage('请确认密码')
      return false
    }
    if (repeat !== password) {
      setMessage('密码不一致')
      return false
    }
    return true
  }
  const onRegister = () => {
    if (!validate()) {
      setMessageStatus('info')
      setShowMessage(true)
    }


    const params = {
      userName: '',
      password,
      userAccount,
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
            defaultValue={userAccount}
            className={styles.containerFormItem}
            placeholder='邮箱或手机号' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'userAccount') } />
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
