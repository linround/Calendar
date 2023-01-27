import { useContext, useEffect } from 'react'
import { BaseContext, CalendarContext } from '../props/propsContext'

export function MonthComponent() {
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
