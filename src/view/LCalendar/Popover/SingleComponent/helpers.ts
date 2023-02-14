import moment from 'moment'
import { VTimestampInput } from '../../utils/calendar'


function getTime(date: VTimestampInput) {
  return moment(date)
    .format('HH:mm')
}


export default { getTime, }
