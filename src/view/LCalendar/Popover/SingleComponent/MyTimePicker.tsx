import { Popover } from 'antd'
import style from './myTimePicker.module.less'
import scrollStyle from '../../commonStyle/scroll.module.less'
import moment from 'moment'
import classnames from 'classnames'
import { BaseFunc, CalendarEvent } from '../../utils/calendar'
import { CheckOutlined } from '@ant-design/icons'
import { ROUND_TIME } from '../../utils/timesStamp'
import { createRef, useEffect } from 'react'


function getFormattedTime(time:number) {
  const format = 'HH:mm'
  return moment(time)
    .format(format)
}
function createStartTimeItems(time:number) {
  const dayStartTime = moment(time)
    .startOf('day')
    .valueOf()
  const segment = 24 * 60 / ROUND_TIME
  const segments = []
  for (let i = 0;i < segment;i++) {
    const interval = ROUND_TIME * i
    const value = moment(dayStartTime)
      .add(interval, 'm')
      .valueOf()

    const label = getFormattedTime(value)
    segments.push({
      label, value,
    })
  }
}


function getDiffMinutes(start:number, end:number) {
  const startMoment = moment(start)
  const endMoment = moment(end)
  const minutes = endMoment.diff(startMoment, 'minutes')

  return minutes
}
function getLabel(start:number, end:number) {
  const minutes = getDiffMinutes(start, end)

  if (minutes < 60) {

    return `（${minutes} 分钟）`
  }
  const hour = Number(minutes / 60)
    .toFixed(1)
  return `（${hour} 小时）`

}

function createEndTimeItems(start:number) {
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
      segments.push({
        label, value,
      })
    } else {
      // 一个小时后的时长间隔 30
      const interval = preDiff + (30 * (i - hourSegments))
      const value = moment(start)
        .add(interval, 'm')
        .valueOf()

      const label = getFormattedTime(value)
      segments.push({
        label, value,
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
  const endTimeItems = createEndTimeItems(event.start)


  const checkRef = createRef<HTMLElement>()
  useEffect(() => {
    console.log(checkRef)
  }, [checkRef])
  return (
    <div className={classnames({
      [style.optionsContainer]: true,
      [scrollStyle.scroll]: true,
    })}>
      {endTimeItems.map((item) => (
        <div className={style.optionsItem} key={item.value} onClick={() => selectTime(item.value)}>
          <div className={style.optionsItemTime}>{item.label}</div>
          {showDiffLabel &&
              <div className={style.optionsItemDiffLable} >
                {getLabel(event.start, item.value)}
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
