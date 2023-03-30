import styles from './style.module.less'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/features/user/userSlice'
import { CommonMessage } from '../LCalendar/commonMessage/message'
import { handleLogin } from '../../api/user'
import { SUCCESS_CODE } from '../../request'
import {
  setMessage, setOpen, setSeverity
} from '../../store/features/PromptBox/promptBoxSlice'

interface IProps {
  setState:(s:string)=>void
}

export function LoginForm(props:IProps) {
  const { setState, } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userAccount, setUserAccount] = useState('')
  const [password, setPassword] = useState('')


  function validate() {
    if (!userAccount) {
      dispatch(setMessage({ message: '请输入账户', }))
      return false
    }
    if (!password) {
      dispatch(setMessage({ message: '请输入密码', }))
      return false
    }
    return true
  }

  const onKeyDown = async (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      await onLogin()
    }
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
  const onLogin = async () => {
    if (!validate()) {
      dispatch(setSeverity({ severity: 'info', }))
      dispatch(setOpen({ open: true, }))
      return
    }
    const params = {
      userName: '',
      userAccount,
      password,
      avatarUrl: 'https://avatars.githubusercontent.com/u/44738166?v=4',
      userEmail: 'yuanlincuc@gmail.com',
    }
    const { code, data, msg, } = await handleLogin(params)
    if (code === SUCCESS_CODE) {
      dispatch(setUser(data))
      navigate('/calendar')
      return
    }
    dispatch(setMessage({ message: msg, }))
    dispatch(setSeverity({ severity: 'error', }))
    dispatch(setOpen({ open: true, }))
  }
  return (
    <>
      <CommonMessage />
      <div className={styles.containerFormContainer}>
        <div className={styles.containerForm}>
          <TextField
            defaultValue={userAccount}
            onKeyDown={onKeyDown}
            className={styles.containerFormItem}
            placeholder='邮箱或手机号' variant='outlined'
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => onchange(e, 'userAccount') } />
          <TextField
            defaultValue={password}
            onKeyDown={onKeyDown}
            className={styles.containerFormItem}
            placeholder='密码' variant='outlined'
            type='password'
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
