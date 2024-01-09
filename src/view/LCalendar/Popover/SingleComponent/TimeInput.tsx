import { getFormattedTime } from './helpers'
import { ChangeEvent, useState } from 'react'
import style from './myTimePicker.module.less'
import { createParseStr2Time } from '../../../../utils/parseStr2Time'
import { BaseFunc } from '../../utils/calendar'

interface TimeInputProps{
  time:number
  onBlur:BaseFunc
}
export function TimeInput(props:TimeInputProps) {
  const { time, onBlur, } = props
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
    console.log(e.target.value, getFormattedTime(parsedTime, 'YYYY-MM-DD-HH-mm-SS'))
  }
  const handleBlur = () => {
    const parsedTime = parseStr2Time(value)
    setValue(getFormattedTime(parsedTime))
    onBlur(parsedTime)
  }
  return (
    <input
      type='text'
      onBlur={handleBlur}
      className={style.timeInput}
      onChange={onChange}
      value={value}/>
  )

}
