import style from './style.module.less'
import { DBForm } from './DBForm'

export function Init() {
  return (
    <div className={style.initWrapper}>
      <DBForm />
    </div>
  )
}
