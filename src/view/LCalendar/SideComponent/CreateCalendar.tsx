import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import SvgIcon from '../../../components/SvgIcon'
import style from './styleSimpleMonth.module.less'
import { GithubPicker } from 'react-color'
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

const defaultColor = '#B80000'
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
          <div>
            <div className={style.createDialogBodyName} >
              <TextField
                style={{
                  width: '100%',
                }}
                hiddenLabel
                defaultValue={name}
                onChange={(e) => setName(e.currentTarget.value)}
                variant="filled"
                size="small"
                placeholder='日历名（如工作、学习日历）'
              />
            </div>
            <GithubPicker
              onChange={handleChange}
              color='#455A64'
              triangle='hide'
              width='100%'
              colors = {['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76',
                '#1273DE', '#004DCF', '#5300EB', '#7B64FF', '#666666']} />
          </div>
        </div>
        <div className={style.createDialogFooter}>
          <Button variant="contained" onClick={handleConfirm}>确认</Button>
        </div>
      </div>
    </Dialog>
  )
}

