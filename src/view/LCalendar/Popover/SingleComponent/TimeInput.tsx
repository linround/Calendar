import { getFormattedTime } from './helpers'
import { ChangeEvent, useState } from 'react'
import style from './myTimePicker.module.less'
import { createParseStr2Time } from '../../../../utils/parseStr2Time'

interface TimeInputProps{
  time:number
}
export function TimeInput(props:TimeInputProps) {
  const { time, } = props
  const formatTime = getFormattedTime(time)
  const [value, setValue] = useState(formatTime)
  const parseStr2Time = createParseStr2Time(time)
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const parsedTime = parseStr2Time(input)
    setValue(e.target.value)
    if (parsedTime === false) {
      console.log('非法的时间输入')
      return
    }
    console.log(e.target.value, getFormattedTime(parsedTime))
  }
  return (
    <input
      type='text'
      className={style.timeInput}
      onChange={onChange}
      value={value}/>
  )

}
