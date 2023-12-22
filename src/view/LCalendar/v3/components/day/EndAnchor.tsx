import classnames from 'classnames'
import styles from './style/event.module.less'
import React from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'

export function EndAnchor() {
  const selector = new Selector()
  selector.on('beforeSelect', (coordinates:ICoordinates) => {
    console.log('beforeSelect')
  })
  selector.on('selecting', (coordinates:ICoordinates) => {
    console.log('selecting')
  })
  selector.on('select', (coordinates:ICoordinates) => {
    console.log('select')
  })
  const onMouseDown = (event:React.MouseEvent) => {
    event.stopPropagation()
    selector.handleInitialEvent(event)
  }

  return (
    <div
      className={classnames({
        [styles.eventAnchor]: true,
        'eventAnchor': true,
      })}
      onMouseDown={onMouseDown}
    >=</div>
  )
}
