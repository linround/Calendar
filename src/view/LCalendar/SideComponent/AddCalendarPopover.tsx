import styles from './styleSimpleMonth.module.less'
import React, {
  useContext, useLayoutEffect, useState
} from 'react'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import classnames from 'classnames'
import { CalendarContext } from '../props/propsContext'
import SvgIcon from '../../../components/SvgIcon'
import { CreateCalendar, IArg } from './CreateCalendar'
import { handleCreateGroup } from '../../../api'
import { SUCCESS_CODE } from '../../../request'
import {
  setOpen, setMessage, setSeverity
} from '../../../store/features/PromptBox/promptBoxSlice'

export  const AddCalendarPopover = () => {
  const { addCalendarRef, setAddCalendarRef, updateGroupList, } = useContext(CalendarContext)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [openCreateDialog, setCreateDialog] = useState(false)
  const [openSubscribeDialog, setSubscribeDialog] = useState(false)


  const className = classnames({
    [commonPopoverStyle.popover]: true,
    [styles.add]: true,
  })


  useLayoutEffect(() => {
    if (addCalendarRef) {
      const { top, left, } = addCalendarRef.getBoundingClientRect()
      setLeft(left)
      setTop(top)
    }
  }, [addCalendarRef])

  const handleCreateCalendar = () => {
    setAddCalendarRef(null)
    setCreateDialog(true)
  }
  const  handleSubscribeCalendar = () => {
    setAddCalendarRef(null)
    setSubscribeDialog(true)
  }
  const onCreateCalendar = async (arg:IArg) => {
    const { groupName, groupColor, } = arg
    const group = {
      groupType: 0, // 0自己的日历 1订阅的日历
      groupColor,
      groupName,
    }
    const { code, } = await handleCreateGroup(group)
    if (code === SUCCESS_CODE) {
      setMessage({ message: '创建成功', })
      setSeverity({ severity: 'success', })
      setOpen({ open: true, })
      updateGroupList()
    }
  }


  return ((
    <>
      <CreateCalendar
        open={openCreateDialog}
        onConfirm={onCreateCalendar}
        onClose={() => setCreateDialog(false)} />
      <CreateCalendar
        open={openSubscribeDialog}
        onConfirm={onCreateCalendar}
        onClose={() => setSubscribeDialog(false)} />
      {
        addCalendarRef && <div
          className={className}
          style={{ top, left, }}>
          <div className={styles.addItem} onClick={handleCreateCalendar}>
            <div className={styles.addItemIcon}>
              <SvgIcon iconName='side_plus' />
            </div>
            新建日历
          </div>
          <div className={styles.addItem} onClick={handleSubscribeCalendar}>
            <div className={styles.addItemIcon}>
              <SvgIcon iconName='side-pocket' />
            </div>
            订阅日历</div>
        </div>
      }
    </>

  )
  )
}
