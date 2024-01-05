import moment from 'moment'
import { VTimestampInput } from '../../utils/calendar'


function getTime(date: VTimestampInput) {
  return moment(date)
    .format('HH:mm')
}

export function getFormattedTime(time:number) {
  const format = 'HH:mm'
  return moment(time)
    .format(format)
}
export default { getTime, }
