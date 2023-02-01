import moment from 'moment'
import { VTimestampInput } from '../calendar'

function add(
  date:VTimestampInput, adder:number, unit: moment.unitOfTime.DurationConstructor
):VTimestampInput {
  return moment(date)
    .add(adder, unit)
    .startOf('day')
    .valueOf()
}

function diff(
  a:VTimestampInput, b:VTimestampInput, unit: moment.unitOfTime.DurationConstructor
):number {
  const dtA = moment(a)
  const dtB = moment(b)
  return dtB.diff(dtA, unit)
}

function max(dateA:VTimestampInput, dateB:VTimestampInput) {
  const dtA = moment(dateA)
  const dtB = moment(dateB)
  const maxDt = moment.max(dtA, dtB)
  return maxDt.toDate()
}

function startOf(date:(VTimestampInput | null) = null, unit:moment.unitOfTime.DurationConstructor) {
  if (unit) {
    return moment(date)
      .startOf(unit)
      .toDate()
  }
  return moment(date)
    .toDate()
}

function min(dateA:VTimestampInput, dateB:VTimestampInput) {
  const dtA = moment(dateA)
  const dtB = moment(dateB)
  const minDt = moment.min(dtA, dtB)
  return minDt.toDate()
}
function defineComparators(
  a:VTimestampInput, b:VTimestampInput, unit:moment.unitOfTime.DurationConstructor
) {
  const dtA = unit ? moment(a)
    .startOf(unit) : moment(a)
  const dtB = unit ? moment(b)
    .startOf(unit) : moment(b)
  return [dtA, dtB, unit]
}
function eq(
  a:VTimestampInput, b:VTimestampInput, unit:moment.unitOfTime.DurationConstructor
) {
  const [dtA, dtB, datePart] = defineComparators(
    a, b, unit
  )
  return (dtA as moment.Moment).isSame(dtB, datePart as moment.unitOfTime.DurationConstructor)
}

function ceil(date:VTimestampInput, unit:moment.unitOfTime.DurationConstructor) {
  const floor = startOf(date, unit)
  return eq(
    floor, date, unit
  ) ? floor : add(
      floor, 1, unit
    )
}





export interface ILocalizer{
  add: (date:VTimestampInput, adder:number, unit:moment.unitOfTime.DurationConstructor)=>VTimestampInput
  diff: (a:VTimestampInput, b:VTimestampInput, unit: moment.unitOfTime.DurationConstructor) => number
  max: (dateA:VTimestampInput, dateB:VTimestampInput) => Date
  startOf: (date:(VTimestampInput | null), unit:moment.unitOfTime.DurationConstructor) => Date
  min: (dateA:VTimestampInput, dateB:VTimestampInput) => Date
  ceil: (date:VTimestampInput, unit:moment.unitOfTime.DurationConstructor) => VTimestampInput
}
const localizer:ILocalizer = {
  add,
  diff,
  max,
  startOf,
  min,
  ceil,
}
export default localizer
