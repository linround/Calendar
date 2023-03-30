import * as React from 'react'
import style from './style.module.less'
import { typeOptions } from './options'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

interface IProps {
  type:string,
  selectType: (type: string) => void
}
export default function MenuTypeSelector(props:IProps) {
  const { selectType, type, } = props
  return (
    <ToggleButtonGroup value={type} className={style.headerRightOptions}>
      {typeOptions.map((option) => (
        <ToggleButton
          key={option.key}
          onClick={() => {
            selectType(option.key)
          }}
          value={option.key}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
