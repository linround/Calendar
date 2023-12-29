import { Popover } from 'antd'
import style from './myTimePicker.module.less'
import scrollStyle from '../../commonStyle/scroll.module.less'
import moment from 'moment'
import classnames from 'classnames'


function getHours(minutes:number) {
  return minutes / 60
}
function createTimeItems(start:number) {
  const segment = 36
  const segments = []
  const format = 'HH:mm'
  let preDiff = 0
  for (let i = 0;i < segment;i++) {
    if (i < 4) {
      const interval = 15 * i
      const value = start + (interval * 60 * 1000)
      const label = moment(value)
        .format(format)
      preDiff = interval * i
      segments.push({
        label, value, diff: preDiff, diffLabel: `${interval}分钟`,
      })
    } else {
      const interval = preDiff + (30 * (i - 4))
      const value = start + (interval * 60 * 1000)
      const label = moment(value)
        .format(format)
      const diff = preDiff + (interval * i)
      segments.push({
        label, value, diff, diffLabel: `${getHours(interval)}小时`,
      })
    }
  }
  return segments

}
function Content() {
  const timeItems = createTimeItems(Date.now())
  return (
    <div className={classnames({
      [style.optionsContainer]: true,
      [scrollStyle.scroll]: true,
    })}>
      {
        timeItems.map((item) => (
          <div className={style.optionsItem} key={item.value}>
            <div className={style.optionsItemTime}>{item.label}</div>
            <div className={style.optionsItemDiffLable}>{item.diffLabel}</div>
          </div>
        ))
      }
    </div>
  )
}
export function MyTimePicker() {

  return (
    <Popover content={Content} arrow={false} placement={'bottom'} trigger={'click'}>

      <div>12:15</div>
    </Popover>
  )
}
