import { CalendarEvent } from '../../utils/calendar'
import { ISlotMetrics } from './timeSlots'
import { accessors } from '../../utils/segments/accessors'
import sortBy from 'lodash.sortby'

interface IOverlap {
  events: CalendarEvent[]
  minimumStartDifference: number // 渲染的最小起始差
  slotMetrics:ISlotMetrics // 相关分组
}

class Event {
  public start : number
  public end :number
  public startMs:number
  public endMs:number
  public top:number
  public height:number
  public data:CalendarEvent
  public rows: Event[]
  public leaves: Event[]
  public container: Event | null
  public row:Event|null
  constructor(data: CalendarEvent, slotMetrics:ISlotMetrics) {
    const {
      start,
      startDate,
      end,
      endDate,
      top,
      height,
    } = slotMetrics.getRange(accessors.start(data), accessors.end(data))
    this.start = start
    this.end = end
    this.startMs = +startDate
    this.endMs = +endDate
    this.top = top
    this.height = height
    this.data = data
    this.rows = []
    this.leaves = []
    this.container = null
    this.row = null
  }
  get tWidth():number {
    if (this.rows.length) {
      const columns = this.rows.reduce((max, row) => Math.max(max, row.leaves.length + 1), 0)
      return 100 / (columns + 1)
    }
    if (this.leaves.length) {
      const availableWidth:number = 100 - (this.container?.tWidth || 0)
      return availableWidth / (this.leaves.length + 1)
    }
    return this.row?.tWidth || 0
  }
  get width():number {
    const noOverlap = this.tWidth
    const overlap = Math.min(100, this.tWidth * 1.7)

    if (this.rows.length || this.leaves.length) {
      return overlap
    }
    const { leaves, } = this.row as Event
    const index = leaves.indexOf(this)
    return index === leaves.length - 1 ? noOverlap : overlap
  }
  get xOffset():number {
    if (this.rows.length) return 0
    if (this.leaves.length) return (this.container?.tWidth || 0)
    const { leaves, xOffset, tWidth, } = this.row as Event
    const index = leaves.indexOf(this) + 1
    return xOffset + (index * tWidth)
  }
}


function sortByRender(events:Event[]):Event[] {
  // 先基于开始时间排序
  // 对已经排序的再基于结束时间排序
  // 从时间戳的小到大
  // 开始时间 1 2  1比2小  所以1在前面
  // 结束时间 3 4  -4比-3小 所以-4在前面
  const sortedByTime = sortBy(events, ['startMs', (e:Event) => -e.endMs]) as Event[]
  const sorted = []
  while (sortedByTime.length > 0) {
    const event = sortedByTime.shift() as Event
    sorted.push(event)
    for (let i = 0;i < sortedByTime.length;i++) {
      const test = sortedByTime[i]
      // 某个event事件 与另一个test事件交集  event事件的结束时间大于 test事件的开始时间
      if (event.endMs > test.startMs) {
        continue
      }
      if (i > 0) {
        const event = sortedByTime.splice(i, 1)[0]
        sorted.push(event)
      }
      break
    }
  }
  return sorted
}
// 检测事件a和b，是否在同一行内
function onSameRow(
  a:Event, b:Event, minimumStartDifference:number
):boolean {
  return (
    // 两者开始时间的差距小于最小起始差 就会在同一行
    Math.abs(b.start - a.start) < minimumStartDifference ||
    // b的开始时间在a内部
    (b.start > a.start && b.start < a.end)
  )
}

export interface IOverlapResult {
  event: CalendarEvent
  style:{
    top:number
    height:number
    width:number
    xOffset:number
  }
}
export  function overlap(params:IOverlap):IOverlapResult[] {
  const { events, minimumStartDifference, slotMetrics, } = params
  const proxies = events.map((event) => new Event(event, slotMetrics))
  const eventsInRenderOrder = sortByRender(proxies)
  // 每个事件可能是 容器，单独的一行，叶子
  //  容器可以包含行，行可以包含多个叶子事件
  const containerEvents = [] as Event[]
  for (let i = 0;i < eventsInRenderOrder.length;i++) {
    const event = eventsInRenderOrder[i]
    //  检查这个事件是否能够放入某个容器事件中
    // 或者容器的开始时间和事件的开始事件之间的差值
    const container = containerEvents.find((c) => c.end > event.start ||
      Math.abs(event.start - c.start) < minimumStartDifference)
    // 没有找到相关的容器事件,表名该事件自己可以是一个容器
    if (!container) {
      event.rows = []
      containerEvents.push(event)
      continue
    }
    // 找到了该事件的容器
    event.container = container
    let row = null
    for (let j = container.rows.length - 1;!row && j >= 0;j++) {
      if (onSameRow(
        container.rows[j], event, minimumStartDifference
      )) {
        row = container.rows[j]
      }
    }

    if (row) {
      row.leaves.push(event)
      event.row = row
    } else {
      container.rows.push(event)
    }
  }
  return eventsInRenderOrder.map((event) => ({
    event: event.data,
    style: {
      top: event.top,
      height: event.height,
      width: event.width,
      xOffset: Math.max(0, event.xOffset),
    },
  }))
}
