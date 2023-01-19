import dayStyle from './day.module.less'
import {
  intervalWidthVal, typeValue, startValue
} from '../settingsRedux'

console.log(startValue, 'startValue')
export default function () {
  return (
    <div className={dayStyle.dayContainer}>
      <div className={dayStyle.dayHeader}>
        <div className={dayStyle.dayHeaderIntervals} style={{ width: intervalWidthVal, }}></div>
        <div className={dayStyle.dayHeaderDay}>
          <div>周四 { typeValue }</div>
          <div>10
            <>
              { startValue }
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
