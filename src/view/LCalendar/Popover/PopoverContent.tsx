import { CalendarEvent } from '../utils/calendar'
import { CloseOutlined } from '@ant-design/icons'

export function PopoverContent(props:React.PropsWithChildren<{event:CalendarEvent}>) {
  const { event, } = props
  return (
    <>
      <div>
        <CloseOutlined />
      </div>
      <div>
        {
          event.name
        }
      </div>
    </>
  )
}
