import {
  useContext, useLayoutEffect, useState
} from 'react'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import { CalendarContext } from '../props/propsContext'
import style from './accountPopover.module.less'
import classnames from 'classnames'

export const AccountPopover = () => {
  const { accountRef, } = useContext(CalendarContext)
  const [right] = useState(10)
  const [top, setTop] = useState(0)

  useLayoutEffect(() => {
    if (accountRef) {
      const { bottom, } = accountRef.getBoundingClientRect()
      setTop(bottom + 10)
    }
  }, [accountRef])

  const className = classnames({
    [commonPopoverStyle.popover]: true,
    [style.container]: true,
  })
  return (
    <>
      {accountRef &&
        <div
          className={className}
          style={{ top, right, }}>
          <div>个人中心个人中心个</div>
        </div>}
    </>
  )
}
