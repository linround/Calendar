import { IEvents } from './components/dayPropsType'
import styles from './style.module.less'
import DayComponent from './components/DayComponent'
import MenuHeader from './modules/MenuHeader'
import React, { useState } from 'react'
import { CalendarEvent } from './utils/calendar'



const dateStr = '2023-01-24 01:07:00'
const start = new Date(dateStr)
  .valueOf()
const end = start + (2 * 60 * 60 * 1000)
const otherEnd = end + (2 * 60 * 60 * 1000)

const week = {
  start: start + 24 * 60 * 60 * 1000,
  end: end + 2 * 24 * 60 * 60 * 1000,
}
const month = {
  start: start,
  end: end + 9 * 24 * 60 * 60 * 1000,
}


export default function () {
  // const onMousemove = (e:MouseEvent) => {
  //   console.log(e.clientY, 'clientY===onMousemove')
  //   console.log(e.offsetY, 'offsetY===onMousemove')
  // }
  const [events] = useState<IEvents>([
    {
      name: 'black',
      color: 'black',
      start: start,
      end: otherEnd,
      timed: true,
    },
    {
      name: 'green',
      color: 'green',
      start: start,
      end: otherEnd,
      timed: true,
    },
    {
      name: 'red',
      color: 'red',
      start: start,
      end: otherEnd,
      timed: true,
    },
    {
      name: 'blue',
      color: 'blue',
      start: start,
      end: end,
      timed: true,
    }
  ])
  const onMousedownEvent = (e: React.MouseEvent, event: CalendarEvent) => {
    console.log('====event', event)
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainLeft}></div>
      <div className={styles.mainRight}>
        <MenuHeader />
        <DayComponent onMousedownEvent={onMousedownEvent} events={events} type={'day'} maxDays={1} weekdays={[2]}  />
      </div>
    </div>
  )
}
