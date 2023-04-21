import { createRef, useContext } from 'react'
import { MouseEventContext } from '../../props/propsContext'
import commonStyle from '../../commonStyle/popover.module.less'
import style from './style/morePopover.module.less'
import classnames from 'classnames'

export function MorePopover() {
  const {
    morePopoverRef,
    moreEvents,
  } = useContext(MouseEventContext)
  const eventRef = createRef<any>()
  const className = classnames({
    [commonStyle.popover]: true,
    [style.popoverContainer]: true,
  })
  console.log(moreEvents)
  return (
    <>
      <div className={className}>
        {moreEvents.map((event, index) => (
          <div key={index}>{event.start}</div>
        ))}
      </div>
    </>
  )
}
