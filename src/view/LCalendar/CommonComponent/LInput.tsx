import styles from './style/LInput.module.less'
import { IDefaultValue } from '../Popover/helpers'
import { ChangeEvent } from 'react'

interface IProps {
  defaultValue: IDefaultValue
  placeholder: string
  onChange: (e:ChangeEvent<HTMLInputElement>) => any
}
export function LInput(props: IProps) {
  const { defaultValue, placeholder, onChange, } = props
  return (
    <input
      className={styles.lCommonInput}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  )
}
