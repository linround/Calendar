import { Popover } from 'antd'
import style from './myTimePicker.module.less'
import scrollStyle from '../../commonStyle/scroll.module.less'
import moment from 'moment'
import classnames from 'classnames'
import { BaseFunc, CalendarEvent } from '../../utils/calendar'
import { CheckOutlined } from '@ant-design/icons'
import { ROUND_TIME } from '../../utils/timesStamp'
import { createRef, useEffect } from 'react'

function getHours(minutes:number) {
  return minutes / 60
}

function getFormattedTime(time:number) {
  const format = 'HH:mm'
  return moment(time)
    .format(format)
}

function createStartItems(time:number) {}
function createTimeItems(start:number) {
  const hourSegments = 60 / ROUND_TIME
  const segment = 50
  const segments = []
  let preDiff = 0
  for (let i = 0;i < segment;i++) {
    if (i <= hourSegments) {
      // 前一个小时的时长间隔 ROUND_TIME
      const interval = ROUND_TIME * i
      const value = moment(start)
        .add(interval, 'm')
        .valueOf()

      const label = getFormattedTime(value)
      preDiff = interval
      console.log(preDiff, interval)
      segments.push({
        label, value, diff: preDiff, diffLabel: `（${interval}分钟）`,
      })
    } else {
      // 一个小时后的时长间隔 30
      const interval = preDiff + (30 * (i - 4))
      const value = moment(start)
        .add(interval, 'm')
        .valueOf()

      const label = getFormattedTime(value)
      const diff = preDiff + (interval * i)
      segments.push({
        label, value, diff, diffLabel: `（${getHours(interval)}小时）`,
      })
    }
  }
  return segments

}


/*
* value 事件的时间
* time 时间项的时间
* */
function isSameMinute(value:number, time:number):boolean {
  return getFormattedTime(value) === getFormattedTime(time)
}
interface ContentProps {
  showDiffLabel:boolean
  // eslint-disable-next-line no-unused-vars
  selectTime:BaseFunc
  time:number
  event:CalendarEvent
}
function Content(props:ContentProps) {
  const {
    showDiffLabel = false,
    selectTime,
    time,
    event,
  } = props
  const timeItems = createTimeItems(event.start)


  const checkRef = createRef<HTMLElement>()
  useEffect(() => {
    console.log(checkRef)
  }, [checkRef])
  return (
    <div className={classnames({
      [style.optionsContainer]: true,
      [scrollStyle.scroll]: true,
    })}>
      {timeItems.map((item) => (
        <div className={style.optionsItem} key={item.value} onClick={() => selectTime(item.value)}>
          <div className={style.optionsItemTime}>{item.label}</div>
          {showDiffLabel &&
              <div className={style.optionsItemDiffLable} >
                {item.diffLabel}
              </div>}
          {isSameMinute(time, item.value) && <CheckOutlined ref={checkRef} />}
        </div>
      ))}
    </div>
  )
}

type MyTimePickerProps = ContentProps
export function MyTimePicker(props:MyTimePickerProps) {
  const { time, } = props

  return (
    <Popover
      content={<Content {...props} />}
      arrow={false}
      placement={'bottom'}
      trigger={'click'}>

      <div>{getFormattedTime(time)}</div>
    </Popover>
  )
}
