import { Link } from 'react-router-dom'
import menuStyles from '@/src/styles/menu.module.less'

export default function () {
  return (
    <>
      <Link to='/Calendar' target='_blank'>
        <div className={menuStyles.menuContainer}>
          Calendar
        </div>
      </Link>
      <Link to='/Buttons' target='_blank'>
        <div className={menuStyles.menuContainer}>
          Buttons
        </div>
      </Link>
    </>

  )
}
