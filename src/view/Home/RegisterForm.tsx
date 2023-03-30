import React, { useState } from 'react'
import styles from './style.module.less'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { handleRegisterUser } from '../../api/user'
import { SUCCESS_CODE } from '../../request'
import {
  setMessage, setOpen, setSeverity
} from '../../store/features/PromptBox/promptBoxSlice'
import { useAppDispatch } from '../../store/hooks'

interface IProps {
  setState:(s:string)=>void
}

export function RegisterForm(props:IProps) {
  const { setState, } = props
  const [userAccount, setUserAccount] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const dispatch = useAppDispatch()
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
      return {
        message: '请输入账户',
        illegal: true,
      }
    }
    if (!password) {
      return {
        message: '请输入密码',
        illegal: true,
      }
    }
    if (!repeat) {
      return {
        message: '请确认密码',
        illegal: true,
      }
    }
    if (repeat !== password) {
      return {
        message: '密码不一致',
        illegal: true,
      }
    }
    return {
      message: '密码不一致',
      illegal: false,
    }
  }
  const onKeyDown = async (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      await onRegister()
    }
  }
  const onRegister = async () => {
    const { illegal, message, } = validate()
    if (illegal) {
      dispatch(setMessage({ message, }))
      dispatch(setSeverity({ severity: 'info', }))
      dispatch(setOpen({ open: true, }))
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
      dispatch(setSeverity({ severity: 'success', }))
      dispatch(setMessage({ message: '注册成功', }))
      dispatch(setOpen({ open: true, }))
      setState('login')
      return
    }
    dispatch(setSeverity({ severity: 'error', }))
    dispatch(setMessage({ message: msg, }))
    dispatch(setOpen({ open: true, }))
  }
  return (
    <>
      <div className={styles.containerFormContainer}>
        <div className={styles.containerForm}>
          <TextField
            defaultValue={userAccount}
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
          <TextField
            defaultValue={repeat}
            onKeyDown={onKeyDown}
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
