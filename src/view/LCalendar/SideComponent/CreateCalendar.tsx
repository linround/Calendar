import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import SvgIcon from '../../../components/SvgIcon'
import style from './styleSimpleMonth.module.less'
import { CirclePicker } from 'react-color'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export interface IArg {
  color: string
  name: string
}
export interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: (arg:IArg)=> void
}

const defaultColor = '#F44336'
const defaultName = ''

export function CreateCalendar(props: IProps) {
  const { onClose, open, onConfirm, } = props
  const [color, setColor] = useState(defaultColor)
  const [name, setName] = useState<string>(defaultName)
  const handleChange = (v:any) => {
    setColor(v.hex)
  }
  const clear = () => {
    setColor(defaultColor)
    setName(defaultName)
  }
  const handleClose = () => {
    clear()
    onClose()
  }
  const handleConfirm = () => {
    clear()
    onConfirm({ color, name, })
    onClose()
  }
  return (
    <Dialog open={open}>
      <div className={style.createDialog}  >
        <div className={style.createDialogHeader}>
          <div className={style.createDialogTitle}>新建日历</div>
          <div className={style.createDialogIcon} onClick={handleClose}>
            <SvgIcon iconName='popover_x' />
          </div>
        </div>
        <div className={style.createDialogBody}>
          <div className={style.createDialogBodyContainer}>
            <div className={style.createDialogBodyName} >
              <TextField
                style={{
                  width: '100%',
                }}
                hiddenLabel
                defaultValue={name}
                onChange={(e) => setName(e.currentTarget.value)}
                variant="outlined"
                size="small"
                placeholder='日历名（如工作、学习日历）'
              />
            </div>
            <CirclePicker
              onChange={handleChange}
              color={color}
              circleSpacing={0}
              width='100%'
              colors = {['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
                '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FF9800', '#FF5722', '#795548', '#607D8B']} />
          </div>
        </div>
        <div className={style.createDialogFooter}>
          <Button variant="contained" onClick={handleConfirm}>确认</Button>
        </div>
      </div>
    </Dialog>
  )
}

