import { DatePicker, DatePickerProps } from 'antd'

import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn.js'
import styles from './myDatePicker.module.less'


interface MyDatePickerProps {
  onChange:DatePickerProps['onChange']
}
export function MyDatePicker(props:MyDatePickerProps) {
  const { onChange, } = props

  return (
    <DatePicker

      showToday={false}
      format='MM月DD日'
      className={styles.myDatePickerContainer}
      onChange={onChange}
      placeholder='选择开始时间'
      allowClear={false}
      picker='date'
      locale={locale} />
  )
}
