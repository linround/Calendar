import {
  getEventCoordinates, IAny, ICoordinates, IEventHandler
} from '../../v2/utils/selection'
import React from 'react'


export function updateParentScroll(scrollContainer:HTMLDivElement, coordinate:ICoordinates) {
  document.addEventListener('click', (e) => {
    console.log('pageY:', e.pageY)
    console.log('clientY:', e.clientY)
  })
}

function addDocEventListener(type:string, fn:(arg:any)=>any) {
  document.addEventListener(type, fn)
  return () => {
    document.removeEventListener(type, fn)
  }
}

export class Selector {
  public listeners: IAny
  constructor() {
    this.handleInitialEvent = this.handleInitialEvent.bind(this)
    this.handleTerminatingEvent = this.handleTerminatingEvent.bind(this)
    this.listeners = Object.create(null)
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
    this.emit('selecting', selectingCoordinates)
  }
  handleTerminatingEvent(e:React.MouseEvent) {
    this.removeMoveListener()
    this.removeEndListener()
    const endCoordinates = getEventCoordinates(e)
    this.emit('select', endCoordinates)
  }
}
