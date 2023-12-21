import {
  getEventCoordinates, IAny, ICoordinates, IEventHandler
} from '../../v2/utils/selection'
import React from 'react'


function addDocEventListener(type:string, fn:(arg:any)=>any) {
  document.addEventListener(type, fn)
  return () => {
    document.removeEventListener(type, fn)
  }
}

export class Selector {
  public listeners: IAny
  public scrollContainer?:HTMLDivElement
  public  coordinate:ICoordinates|null
  public timerID:NodeJS.Timeout|null
  constructor(scrollContainer?:HTMLDivElement) {
    this.handleInitialEvent = this.handleInitialEvent.bind(this)
    this.handleTerminatingEvent = this.handleTerminatingEvent.bind(this)
    this.updateParentScroll = this.updateParentScroll.bind(this)
    this.clearUpdateParentScroll = this.clearUpdateParentScroll.bind(this)
    this.listeners = Object.create(null)


    this.scrollContainer = scrollContainer // 记录滚动的容器元素
    this.coordinate = null // 记录鼠标坐标点
    this.timerID = null
  }
  updateParentScroll() {
    const scrollContainer = this.scrollContainer
    const coordinate = this.coordinate
    if (!coordinate || !scrollContainer) {
      return
    }
    setTimeout(() => {

      const scrollRect = scrollContainer.getBoundingClientRect()
      const scrollRectTop = scrollRect.top
      const scrollRectBottom = scrollRect.bottom
      const mousePointY = coordinate.clientY

      const distanceTop = mousePointY - scrollRectTop
      const distanceBottom = scrollRectBottom - mousePointY

      // 距离上下边界的阈值
      const thresholdDistance = 20
      // 设置每一帧的滚动速度
      const scrollSpeed = 2

      // 之前距离滚动框未滚动的位置
      const beforeScrollTop = scrollContainer.scrollTop
      if (distanceTop < thresholdDistance) {
        // 向上滚动
        scrollContainer.scrollTop = beforeScrollTop - scrollSpeed
        // 新的坐标点
        coordinate.clientY -= beforeScrollTop - scrollContainer.scrollTop
      } else if (distanceBottom < thresholdDistance) {
        // 向下滚动
        scrollContainer.scrollTop = beforeScrollTop + scrollSpeed
        coordinate.clientY +=  scrollContainer.scrollTop - beforeScrollTop
      }

      console.log('coordinate:', coordinate.clientY)
      this.emit('selecting', coordinate)
    })


    // document.addEventListener('click', (e) => {
    //   console.log('pageY:', e.pageY)
    //   console.log('clientY:', e.clientY)
    // })
  }
  addUpdateParentScroll() {
    if (this.timerID !== null) {
      return
    }
    this.timerID = setInterval(() => {
      requestAnimationFrame(this.updateParentScroll)
    })
  }
  clearUpdateParentScroll() {
    if (this.timerID === null) {
      return
    }
    clearInterval(this.timerID)
    this.timerID = null
    this.coordinate = null
  }
  removeEndListener() {
    return
  }
  removeMoveListener() {
    return
  }
  on(type:IEventHandler, handler:any):void {
    const handlers = this.listeners[type]
    if (handlers) {
      handlers.push(handler)
      return
    }
    this.listeners[type] = [handler]
  }
  emit(type:IEventHandler, ...args:any[]) {
    let result:any
    const handlers = this.listeners[type]
    handlers.forEach((fn:any) => {
      if (result === undefined) {
        result = fn(...args)
      }
    })
    return result
  }
  handleInitialEvent(e:React.MouseEvent) {
    const initCoordinates = getEventCoordinates(e)
    const stop = this.emit('beforeSelect', initCoordinates)
    if (stop) return
    switch (e.type) {
    case 'mousedown':{
      this.removeMoveListener = addDocEventListener('mousemove', (e:React.MouseEvent) => {
        this.handleMoveEvent(e)
      })
      this.removeEndListener = addDocEventListener('mouseup', (e:React.MouseEvent) => {
        this.handleTerminatingEvent(e)
      })
    }
    }
  }
  handleMoveEvent(e:React.MouseEvent) {
    const selectingCoordinates = getEventCoordinates(e)
    this.coordinate = selectingCoordinates
    this.addUpdateParentScroll()
    this.emit('selecting', selectingCoordinates)
  }
  handleTerminatingEvent(e:React.MouseEvent) {
    this.removeMoveListener()
    this.removeEndListener()
    const endCoordinates = getEventCoordinates(e)
    this.clearUpdateParentScroll()
    this.emit('select', endCoordinates)
  }
}
