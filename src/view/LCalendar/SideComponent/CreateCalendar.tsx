import React from 'react'
import Dialog from '@mui/material/Dialog'
import SvgIcon from '../../../components/SvgIcon'
import style from './styleSimpleMonth.module.less'

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCalendar(props: SimpleDialogProps) {
  const { onClose, open, } = props



  return (
    <Dialog open={open}>
      <div className={style.createDialog}  >
        <div className={style.createDialogHeader}>
          <div>新建日历</div>
          <div className={style.createDialogIcon} onClick={onClose}>
            <SvgIcon iconName='popover_x' />
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </Dialog>
  )
}

