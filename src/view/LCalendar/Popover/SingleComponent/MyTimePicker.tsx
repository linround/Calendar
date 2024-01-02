import { Popover } from 'antd'
import style from './myTimePicker.module.less'
import scrollStyle from '../../commonStyle/scroll.module.less'
import moment from 'moment'
import classnames from 'classnames'


function getHours(minutes:number) {
  return minutes / 60
}
function createTimeItems(start:number) {
  const segment = 50
  const segments = []
  const format = 'HH:mm'
  let preDiff = 0
  for (let i = 0;i < segment;i++) {
    if (i < 5) {
      const interval = 15 * i
      const value = start + (interval * 60 * 1000)
      const label = moment(value)
        .format(format)
      preDiff = interval
      console.log(preDiff, interval)
      segments.push({
        label, value, diff: preDiff, diffLabel: `（${interval}分钟）`,
      })
    } else {
      const interval = preDiff + (30 * (i - 4))
      const value = start + (interval * 60 * 1000)
      const label = moment(value)
        .format(format)
      const diff = preDiff + (interval * i)
      segments.push({
        label, value, diff, diffLabel: `（${getHours(interval)}小时）`,
      })
    }
  }
  return segments

}

interface ContentProps {
  showDiffLabel:boolean
}
function Content(props:ContentProps) {
  const { showDiffLabel = false, } = props
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
            {showDiffLabel &&
              <div className={style.optionsItemDiffLable}>{item.diffLabel}</div>}
          </div>
        ))
      }
    </div>
  )
}

type MyTimePickerProps = ContentProps
export function MyTimePicker(props:MyTimePickerProps) {

  return (
    <Popover
      content={<Content {...props} />}
      arrow={false}
      placement={'bottom'}
      trigger={'click'}>

      <div>12:15</div>
    </Popover>
  )
}
