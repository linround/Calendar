import {
  useContext, useLayoutEffect, useState
} from 'react'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import { BaseContext, CalendarContext } from '../props/propsContext'
import style from './accountPopover.module.less'
import classnames from 'classnames'
import SvgIcon from '../../../components/SvgIcon'

export const AccountPopover = () => {
  const { accountRef, } = useContext(CalendarContext)
  const { user, } = useContext(BaseContext)
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
      {
        accountRef &&
        <div className={className}
          style={{ top, right, }}>
          <div className={style.containerUser}>
            <div className={style.containerUserContainer}>
              <div
                style={{ minHeight: 86,
                  minWidth: 86, }}
                className={style.containerUserImg}>
                <img
                  src={user?.avatarUrl}
                  width={70}
                  height={70}
                />
              </div>
              <div className={style.containerUserInfo}>
                <div className={style.containerUserInfoName}>{user?.userName}</div>
                <div className={style.containerUserInfoEmail}>{user?.userEmail}</div>
              </div>
            </div>
            <div className={style.containerUserCenter}>
              <SvgIcon iconName='user' />
              <div className={style.containerUserCenterText}>
                个人中心
              </div>
            </div>
          </div>
          <div className={style.containerLoginOut}>
            <SvgIcon iconName='user_log-out' />
            <div className={style.containerLoginOutText}>
              退出登录
            </div>
          </div>
        </div>
      }
    </>
  )
}
