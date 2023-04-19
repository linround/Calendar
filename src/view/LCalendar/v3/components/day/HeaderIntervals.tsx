import style from './style/headerIntervals.module.less'
import { SvgIcon } from '../../../../../components'
import React from 'react'

interface IProps {
  intervalWidth:number
  fold:boolean
  onMore:()=>void
}
export function HeaderIntervals(props:React.PropsWithChildren<IProps>) {
  const { intervalWidth, fold, onMore, } = props
  const handleChangeOpen = () => {
    onMore()
  }
  return (
    <div
      className={style.headerIntervals}
      onClick={handleChangeOpen}
      style={{ width: intervalWidth, }} >
      <span>GMT+08</span>
      <span className={style.headerIntervalsIcon}>
        {fold ? <SvgIcon iconName='side-chevron-up'/> :
          <SvgIcon iconName='side-chevron-down' />
        }
      </span>
    </div>
  )
}
