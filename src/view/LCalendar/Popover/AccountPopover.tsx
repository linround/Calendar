import React, {
  useState,
  useContext,
  useLayoutEffect
} from 'react'
import classnames from 'classnames'
import style from './accountPopover.module.less'
import SvgIcon from '../../../components/SvgIcon'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import { CalendarContext } from '../props/propsContext'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { removerUser, selectUser } from '../../../store/features/user/userSlice'
import { useNavigate } from 'react-router-dom'


export const AccountPopover = () => {
  const { accountRef, } = useContext(CalendarContext)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser).user
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
  const handleLogOut = () => {
    dispatch(removerUser())
    navigate('/')

  }
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
                {
                  user?.avatarUrl ?
                    <img
                      src={user?.avatarUrl}
                      width={70}
                      height={70}
                    /> :
                    <SvgIcon iconName='user' />
                }
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
          <div className={style.containerLoginOut} onClick={handleLogOut}>
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
