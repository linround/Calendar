import React from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { IMonth } from '../../../components/type'
import { getDayTimeFromPoint } from '../../utils/point'

interface IProps {
  container:HTMLDivElement
  month:IMonth
}
export function MonthWrapper(props:React.PropsWithChildren<IProps>) {

  const {
    children,
    container,
    month,
  } = props
  const containerRect = container?.getBoundingClientRect()
  const selector = new Selector()
  selector.on('beforeSelect', (data:ICoordinates) => {
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    console.log(timestamp.date)
  })
  selector.on('selecting', (data:ICoordinates) => {})
  selector.on('select', (data:ICoordinates) => {})

  return React.cloneElement(children as React.ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
