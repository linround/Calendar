import React, { useState } from 'react'
import styles from './style.module.less'
import Button from '@mui/material/Button'
import { AlertColor } from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import { handleRegisterUser } from '../../api/user'
import { CommonMessage } from '../LCalendar/commonMessage/message'
import { SUCCESS_CODE } from '../../request'

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
  const onRegister = async () => {
    if (!validate()) {
      setMessageStatus('info')
      setShowMessage(true)
      return
    }


    const params = {
      password,
      userAccount,
      userName: '',
      avatarUrl: '',
      userEmail: '',
    }
    const { code, msg, } = await handleRegisterUser(params)
    if (code === SUCCESS_CODE) {
      setMessageStatus('success')
      setMessage('注册成功')
      setShowMessage(true)
      return
    }
    setMessageStatus('error')
    setMessage(msg)
    setShowMessage(true)
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
            type='password'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'password') } />
          <TextField
            defaultValue={repeat}
            className={styles.containerFormItem}
            placeholder='确认密码' variant='outlined'
            type='password'
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
