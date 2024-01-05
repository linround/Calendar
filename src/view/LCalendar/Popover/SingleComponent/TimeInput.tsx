import { getFormattedTime } from './helpers'
import { ChangeEvent, useState } from 'react'
import style from './myTimePicker.module.less'
import { parseTime } from '../../utils/timesStamp'

interface TimeInputProps{
  time:number
}
export function TimeInput(props:TimeInputProps) {
  const { time, } = props
  const formatTime = getFormattedTime(time)
  const [value, setValue] = useState(formatTime)
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const inputTime = parseTime(input)
    console.log(e.target.value, inputTime)
    setValue(e.target.value)
  }
  return (
    <input
      type='text'
      className={style.timeInput}
      onChange={onChange}
      value={value}/>
  )

}
