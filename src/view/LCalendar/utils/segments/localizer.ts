import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  lte, neq, gt, gte
} from 'date-arithmetic'
import { CalendarEvent, VTimestampInput } from '../calendar'

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

function isSameDate(date1:VTimestampInput, date2:VTimestampInput) {
  return eq(
    date1, date2, 'day'
  )
}


interface IRange{
  start:VTimestampInput,
  end:VTimestampInput
}
interface IRangeArg {
  event:IRange
  range:IRange
}
function inEventRange(arg:IRangeArg):boolean {
  const { event, range, } = arg
  const { start, end, } = event
  const { start: rangeStart, end: rangeEnd, } = range
  const eStart = startOf(start, 'day')
  const startBeforeEnd = lte(
    eStart, rangeEnd, 'day'
  )
  const sameMin = neq(
    eStart, end, 'minutes'
  )
  const endsAfterStart = sameMin ?
    gt(
      end, rangeStart, 'minutes'
    ) :
    gte(
      end, rangeEnd, 'minutes'
    )
  return startBeforeEnd && endsAfterStart
}


interface ISortEventsArg{
  evtA:CalendarEvent,
  evtB:CalendarEvent
}
function sortEvents(arg:ISortEventsArg) {
  const { evtA, evtB, } = arg
  const { start: aStart, end: aEnd, allDay: aAllDay, } = evtA
  const { start: bStart, end: bEnd, allDay: bAllDay, } = evtB
  const startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day')
  const durA = diff(
    aStart, ceil(aEnd, 'day'), 'day'
  )
  const durB = diff(
    bStart, ceil(bEnd, 'day'), 'day'
  )
  return (
    startSort ||
    Math.max(durB, 1) - Math.max(durA, 1) ||
    +bAllDay - +aAllDay ||
    +aStart - + bStart ||
    +aEnd - +bEnd
  )
}


export interface ILocalizer{
  add: (date:VTimestampInput, adder:number, unit:moment.unitOfTime.DurationConstructor)=>VTimestampInput
  diff: (a:VTimestampInput, b:VTimestampInput, unit: moment.unitOfTime.DurationConstructor) => number
  max: (dateA:VTimestampInput, dateB:VTimestampInput) => Date
  startOf: (date:(VTimestampInput | null), unit:moment.unitOfTime.DurationConstructor) => Date
  min: (dateA:VTimestampInput, dateB:VTimestampInput) => Date
  ceil: (date:VTimestampInput, unit:moment.unitOfTime.DurationConstructor) => VTimestampInput
  isSameDate: (date1:VTimestampInput, date2:VTimestampInput)=>boolean
  segmentOffset: number
  inEventRange:(arg:IRangeArg) => boolean
  sortEvents: (arg:ISortEventsArg) => (number)
}
const localizer:ILocalizer = {
  add,
  diff,
  max,
  startOf,
  min,
  ceil,
  isSameDate,
  segmentOffset: 0,
  inEventRange,
  sortEvents,
}
export default localizer
