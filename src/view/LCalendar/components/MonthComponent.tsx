import { useContext, useEffect } from 'react'
import { BaseContext, CalendarContext } from '../props/propsContext'
import { IMonthProps } from './monthPropsType'

export function MonthComponent(props: IMonthProps) {
  const { parsedValue, } = props
  const { setStart, setEnd, } = useContext(BaseContext)
  const { type, } = useContext(CalendarContext)
  useEffect(() => {
    switch (type) {
    case 'month':{
      console.log(type, '======type')
    }
    }
  }, [type])
  return (
    <>
      MonthComponent
    </>
  )
}
