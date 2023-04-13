import { ICoordinates } from '../../v2/utils/selection'
import { CalendarTimestamp } from '../../utils/calendar'
import { DOM } from '@fortawesome/fontawesome-svg-core'
import { copyTimestamp, updateMinutes } from '../../utils/timesStamp'

// 判断某个点是否在边界多边形内部
export function inBounds(bounds:DOMRect, point:ICoordinates):boolean {
  const { clientX, clientY, } = point
  const { top, bottom, left, right, } = bounds
  return ((clientX) >= left && clientX <= right) && ((clientY) >= top && clientY <= bottom)
}

export function correctCoordinates(
  scrollBounds:DOMRect,
  bounds:DOMRect,
  point:ICoordinates
):ICoordinates {
  // 水平位置（因为需要排除掉滚动空间中的时间线条，所以只关注相关日）
  const horizontalPosition = getHorizontalPosition(bounds, point)
  // 垂直位置,(因为需要处理滚动问题，所以一定行相对与滚动容器来进行位置判断)
  const verticalPosition = getVerticalPosition(scrollBounds, point)

  // 在内部移动
  if (horizontalPosition === 'inside' && verticalPosition === 'inside') {
    return point
  }
  if (horizontalPosition === 'right') {
    point.clientX = bounds.right - 1 // 边界处理
  }
  if (horizontalPosition === 'left') {
    point.clientX = bounds.left + 1 // 边界处理
  }
  // 暂未处理滚动相关
  if (verticalPosition === 'bottom') {
    point.clientY = scrollBounds.bottom
  }
  if (verticalPosition === 'top') {
    point.clientY = scrollBounds.top
  }
  return point
}

export function intervalScroll(element:HTMLElement, key:'+'|'-'):()=>void {
  const timeInterval = setInterval(() => {
    switch (key) {
    case '+':{
      element.scrollTop += 1
      break
    }
    case '-':{
      element.scrollTop -= 1
      break
    }
    }
  }, 50)
  return  () => {
    clearInterval(timeInterval)
  }
}


type horizontalPosition = 'left'|'right'|'inside'
export function getHorizontalPosition(containerRect:DOMRect, mousePoint:ICoordinates) :horizontalPosition {

  if (mousePoint.clientX < containerRect.left) {
    return 'left'
  } else if (mousePoint.clientX > containerRect.right) {
    return  'right'
  }
  return 'inside'
}

type verticalPosition = 'top'|'bottom'|'inside'
export function getVerticalPosition(containerRect:DOMRect, mousePoint:ICoordinates):verticalPosition {

  if (mousePoint.clientY < containerRect.top) {
    return 'top'
  } else if (mousePoint.clientY > containerRect.bottom) {
    return 'bottom'
  }
  return 'inside'

}

// 根据外部容器，计算容器中的某个点是属于哪一列
export function getDaySlotFromPoint(
  daysRect:DOMRect, point:ICoordinates, days:CalendarTimestamp[]
):CalendarTimestamp {
  // 获取容器宽度
  const rectWidth = daysRect.right - daysRect.left
  // 获取每一列的宽度
  const slotWidth = rectWidth / days.length
  // 计算改点到左边的距离
  const pointLeft = point.clientX - daysRect.left
  // 点到左边的距离除以总的宽度，得到百分比
  const slot = Math.floor(pointLeft / slotWidth)
  return days[slot]
}


//

export function getTimeFromPoint(
  scrollRect:DOMRect,
  daysRect:DOMRect,
  data:ICoordinates,
  days:CalendarTimestamp[],
  firstMinute:number,
  intervalHeight:number,
  intervalMinutes:number,
  createBounds?:DOMRect
):CalendarTimestamp {
  let point :ICoordinates
  // 正对create事件，需要处理成对应的create边界
  if (createBounds) {
    point = correctCoordinates(
      scrollRect, createBounds, data
    )
  } else {
    point = correctCoordinates(
      scrollRect, daysRect, data
    )
  }
  const day = getDaySlotFromPoint(
    daysRect, point, days
  )
  const timeStamp = copyTimestamp(day)
  const baseMinutest = firstMinute
  const { clientY, } = point
  //   点击处相对视口的位置 减去 容器顶部的位置从而得到 事件点与顶部相距的距离
  //   除以每个格子的高度，从而获得移动的格子数
  const addIntervals:number = (clientY - daysRect.top) / intervalHeight
  //   每个格子代表的分钟数乘以移动的格子 得到移动的分钟数
  const addMinutes :number = Math.floor(addIntervals * intervalMinutes)
  //   顶部的分钟数加上移动的分钟数，得到当前的分钟数
  const minutes:number = baseMinutest + addMinutes
  const time = updateMinutes(timeStamp, minutes)
  return time
}
