import React, {
  createRef, ReactElement, useEffect
} from 'react'
import { ISlotMetrics } from '../utils/timeSlots'
import { timeViewContainer } from '../utils/day'
import { Selection } from '../utils/selection'

interface IEventContainerWrapper {
  slotMetrics:ISlotMetrics
}
export function EventContainerWrapper(props:React.PropsWithChildren<IEventContainerWrapper>) {

  const ref = createRef<HTMLDivElement>()
  const handleSelectable = ():void => {
    const wrapper = ref.current as HTMLDivElement
    const node = wrapper.children[0]
    const isBeingDragged = false
    const selector = new Selection((() => wrapper.closest(`.${timeViewContainer}`) as HTMLDivElement), {})
    selector.on('beforeSelect', (point) => {
      console.log(point, 'beforeSelect')
    })
    selector.on('selecting', (box) => {
      console.log(box, 'selecting')
    })
    selector.on('dropFromOutside', (point) => {
      console.log(point, 'dropFromOutside')
    })
    selector.on('dragOver', (point) => {
      console.log(point, 'dragOver')
    })
    selector.on('selectStart', () => {
      console.log('selectStart')
    })
    selector.on('select', (point) => {
      console.log(point, 'select')
    })
    selector.on('click', () => {
      console.log('click')
    })
    selector.on('reset', () => {
      console.log('reset')
    })
  }
  useEffect(() => {
    handleSelectable()
  }, [ref])

  const Content = () => {
    const { children, slotMetrics, } = props
    // 事件容器的子节点
    const events = (children as ReactElement).props.children
    return (
      React.cloneElement(children as ReactElement, {
        children: (
          <React.Fragment>
            {events}
          </React.Fragment>
        ),
      })
    )
  }
  return (
    <div ref={ref}>
      <Content />
    </div>
  )
}
