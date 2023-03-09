import React from 'react'
import styles from './style.module.less'
import Button from '@mui/material/Button'
import SvgIcon from '../../components/SvgIcon'
import TextField from '@mui/material/TextField'


export default function () {

  return (
    <div>
      <div className={styles.container}>
        <SvgIcon iconName='UCalendar'></SvgIcon>
        <div className={styles.containerFormContainer}>
          <div className={styles.containerForm}>
            <TextField className={styles.containerFormItem} placeholder='邮箱或手机号' variant='outlined' />
            <TextField  className={styles.containerFormItem} placeholder='密码' variant='outlined' />
            <Button  className={styles.containerFormItem} variant="contained" size="large">
              登录
            </Button>
            <div className={styles.containerFormForget}>
              <span className={styles.containerFormForgetText}>忘记密码？</span>
            </div>
          </div>
          <div className={styles.containerFormFooter}>
            <Button variant="contained" color="success" size="large">
              新建账户
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.containerCopyright}>
        <div>ucalendar@2023</div>
        <div>yuanlincuc@gmail.com</div>

      </div>
    </div>

  )
}
