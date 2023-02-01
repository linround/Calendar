import { VTimestampInput } from '../calendar'
import { ILocalizer } from './localizer'
import moment from 'moment'

interface IRangeResponse {
  first: VTimestampInput
  last: VTimestampInput
}
interface IOptions {
  dateRange: VTimestampInput []
  localizer: ILocalizer
  unit?: moment.unitOfTime.DurationConstructor
}


export function endOfRange(options:IOptions):IRangeResponse {
  const { dateRange, unit = 'day', localizer, } = options
  return {
    first: dateRange[0],
    last: localizer.add(
      dateRange[dateRange.length - 1], 1, unit
    ),
  }
}
