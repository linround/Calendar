import style from './style/headerContent.module.less'
import { SvgIcon } from '../../../../../components'
import React, { useState } from 'react'

interface IProps {
  intervalWidth:number
}
export function HeaderIntervals(props:React.PropsWithChildren<IProps>) {
  const { intervalWidth, } = props
  const [open, setOpen] = useState(true)
  const handleChangeOpen = () => {
    setOpen(!open)
  }
  return (
    <div
      className={style.headerInterVals}
      onClick={handleChangeOpen}
      style={{ width: intervalWidth, }} >
      <span>GMT +08</span>
      <span>
        {open ? <SvgIcon iconName='side-chevron-up'/> :
          <SvgIcon iconName='side-chevron-down' />
        }
      </span>
    </div>
  )
}
