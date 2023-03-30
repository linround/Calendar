import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import formStyle from './formStyle.module.less'
import React, { useState } from 'react'
import { initDB } from '../../api/db'
import { SUCCESS_CODE } from '../../request'
import { CommonMessage } from '../LCalendar/commonMessage/message'
import {
  setMessage, setSeverity, setOpen
} from '../../store/features/PromptBox/promptBoxSlice'
import { useAppDispatch } from '../../store/hooks'

function formState() {
  const [dbType, setDbType] = useState<string>('mysql')
  const [host, setHost] = useState<string>('127.0.0.1')
  const [port, setPort] = useState<string>('3306')
  const [userName, setUserName] = useState<string>('root')
  const [password, setPassword] = useState<string>('123456')
  const [dbName, setDbName] = useState<string>('calendar')
  const handleChange = (handlerName:string, value:string) => {
    switch (handlerName) {
    case 'dbType':{
      setDbType(value)
      break
    }
    case 'host':{
      setHost(value)
      break
    }
    case 'port':{
      setPort(value)
      break
    }
    case 'userName':{
      setUserName(value)
      break
    }
    case 'password':{
      setPassword(value)
      break
    }
    case 'dbName':{
      setDbName(value)
      break
    }
    }
  }
  return {
    dbType,
    host,
    port,
    userName,
    password,
    dbName,
    handleChange,
  }
}

export function DBForm() {
  const dispatch = useAppDispatch()

  const {
    dbType,
    host,
    port,
    userName,
    password,
    dbName,
    handleChange,
  } = formState()
  const handleInit = async () => {
    const params = {
      dbType,
      host,
      port,
      userName,
      password,
      dbName,
    }
    const { code, msg, } = await initDB(params)


    if (code !== SUCCESS_CODE) {
      dispatch(setMessage({ message: msg, }))
      dispatch(setSeverity({ severity: 'error', }))
      dispatch(setOpen({ open: true, }))
    } else {
      dispatch(setMessage({ message: msg, }))
      dispatch(setSeverity({ severity: 'success', }))
      dispatch(setOpen({ open: true, }))
    }

  }
  return (
    <>
      <CommonMessage />
      <div className={formStyle.formWrapper}>
        <TextField
          defaultValue={dbType}
          onChange={(event) => handleChange('dbType', event.target.value)}
          className={formStyle.formItem}
          placeholder='数据库类型'
          variant='outlined'
        />
        <TextField
          defaultValue={host}
          onChange={(event) => handleChange('host', event.target.value)}
          className={formStyle.formItem}
          placeholder='主机'
          variant='outlined'
        />
        <TextField
          defaultValue={port}
          onChange={(event) => handleChange('port', event.target.value)}
          className={formStyle.formItem}
          placeholder='端口'
          variant='outlined'
        />
        <TextField
          defaultValue={userName}
          onChange={(event) => handleChange('userName', event.target.value)}
          className={formStyle.formItem}
          placeholder='用户名'
          variant='outlined'
        />
        <TextField
          defaultValue={password}
          onChange={(event) => handleChange('password', event.target.value)}
          className={formStyle.formItem}
          placeholder='密码'
          variant='outlined'
          type='password'
        />
        <TextField
          defaultValue={dbName}
          onChange={(event) => handleChange('dbName', event.target.value)}
          className={formStyle.formItem}
          placeholder='数据库名称'
          variant='outlined'
        />
        <Button
          onClick={handleInit}
          className={formStyle.formItem}
          variant="contained"
          size="large"
        >初始化数据库</Button>
      </div>
    </>
  )
}
