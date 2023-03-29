import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import formStyle from './formStyle.module.less'
import React, { useState } from 'react'

function formState() {
  const [dbType, setDbType] = useState('mysql')
  const [host, setHost] = useState('127.0.0.1')
  const [port, setPort] = useState('3306')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [dbName, setDbName] = useState('')
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
    case 'username':{
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
    username,
    password,
    dbName,
    handleChange,
  }
}

export function DBForm() {
  const {
    dbType,
    host,
    port,
    username,
    password,
    dbName,
    handleChange,
  } = formState()
  const handleInit = () => {
    const params = {
      dbType,
      host,
      port,
      username,
      password,
      dbName,
    }
    console.log(params)
  }
  return (
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
        defaultValue={username}
        onChange={(event) => handleChange('username', event.target.value)}
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
  )
}
