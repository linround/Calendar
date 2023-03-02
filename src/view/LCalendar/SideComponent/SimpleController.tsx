import React, { useContext } from 'react'
import {  CalendarContext } from '../props/propsContext'
import { getValueFormat } from '../utils/time'
import stylesSimple from './styleSimpleMonth.module.less'
import { SvgIcon } from '../../../components'
import { ISimpleControllerProps } from './utils'



export function SimpleController(props:ISimpleControllerProps) {
  const {  value, } = useContext(CalendarContext)
  const { prev, next, } = props

  return (
    <div className={stylesSimple.controller}>
      <div>{getValueFormat(value, 'month')}</div>
      <div
        className={stylesSimple.controllerOperator}>
        <span onClick={() => prev(-1)}>
          <SvgIcon
            className={stylesSimple.controllerIcon}
            iconName='header_arrow-left-circle'/>
        </span>
        <span onClick={() => next(1)}>
          <SvgIcon
            className={stylesSimple.controllerIcon}
            iconName='header_arrow-right-circle'/>
        </span>
      </div>
    </div>
  )
}
