import React from 'react'
import { contains, listen } from 'dom-helpers'
import { EventHandler } from 'dom-helpers/addEventListener'
import { stopDefaultEvent } from '../../utils/events'
const clickTolerance = 5
const clickInterval = 250

export type IEventHandler = 'selecting'|
  'beforeSelect'|
  'selectStart'|
  'reset'|
  'select'|
  'doubleClick'|
  'dragOverFromOutside'|
  'dropFromOutside'|
  'dragOver'|
  'click'



type INode = ()=>HTMLDivElement
interface IAny {
  [prop :string]:any
}
interface IOptions {
  global?: boolean
  longPressThreshold?: number
  validContainers?: string[]
}
interface ICoordinates {
  clientX: number
  clientY:number
  pageX: number
  pageY:number
}
interface IEventCoordinatesData {
  clientX: number
  clientY:number
  x: number
  y:number
}
interface ISelectRect {
  top: number
  left:number
  x:number
  y:number
  right:number
  bottom:number
}
function addEventListener(
  type:keyof HTMLElementEventMap, handler: EventHandler<any>, target = document
) {
  return listen<keyof HTMLElementEventMap>(
    (target as any), type, handler, {}
  )
}

interface ILastClickData {
  timestamp: number
}
function getEventCoordinates(event: React.MouseEvent):ICoordinates {
  const target = event
  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY,
  }
}

export class Selection {
  public isDetached:boolean
  public container: INode
  public globalMouse :boolean
  public longPressThreshold:number
  public validContainers: string[]
  public listeners: IAny
  public initialEventData:IEventCoordinatesData|null
  public selecting?:boolean
  public selectRect?:ISelectRect
  public lastClickData?: ILastClickData
  public removeDropFromOutsideListener:()=>void
  public removeDragOverFromOutsideListener:()=>void
  constructor(node:INode, options:IOptions) {
    const { global = false, longPressThreshold = 250, validContainers = [], } = options
    this.isDetached = false
    this.container = node
    this.globalMouse = !node || global
    this.longPressThreshold = longPressThreshold
    this.validContainers = validContainers
    this.listeners = Object.create(null)
    this.initialEventData = null
    this.handleInitialEvent = this.handleInitialEvent.bind(this)
    this.handleMoveEvent = this.handleMoveEvent.bind(this)
    this.handleTerminatingEvent = this.handleTerminatingEvent.bind(this)
    this.removeDropFromOutsideListener = addEventListener('drop', this.dropFromOutsideListener)
    this.removeDragOverFromOutsideListener = addEventListener('dragover', this.dragOverFromOutsideListener)
    this.addInitialEventListener()
  }
  removeInitialEventListener() {
    return
  }
  addInitialEventListener() {
    const removeMouseDownListener = addEventListener('mousedown', (e:React.MouseEvent) => {
      this.removeInitialEventListener()
      this.handleInitialEvent(e)
      this.removeInitialEventListener = addEventListener('mousedown', this.handleInitialEvent)
    })
    this.removeInitialEventListener = () => {
      removeMouseDownListener()
    }
  }
  dragOverFromOutsideListener(e:React.MouseEvent) {
    const { pageX, pageY, clientX, clientY, } = getEventCoordinates(e)
    this.emit('dragOverFromOutside', {
      x: pageX,
      y: pageY,
      clientX: clientX,
      clientY: clientY,
    })
    stopDefaultEvent(e)
  }
  dropFromOutsideListener(e:React.MouseEvent) {
    const { pageY, pageX, clientX, clientY, } = getEventCoordinates(e)
    this.emit('dropFromOutside', {
      x: pageX, y: pageY, clientX, clientY,
    })
    stopDefaultEvent(e)
  }
  isClick(pageX:number, pageY:number):boolean {
    const { x, y, } = this.initialEventData as IEventCoordinatesData
    return (
      Math.abs(pageX - x) <= clickTolerance &&
        Math.abs(pageY - y) <= clickTolerance
    )
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
  removeEndListener() {
    return
  }
  removeMoveListener() {
    return
  }
  isWithinValidContainer(e:React.MouseEvent):boolean {
    const target = e.target as Element
    const containers = this.validContainers
    if (!containers || !containers.length || !target) {
      return true
    }
    return containers.some((t) => !!target.closest(t))
  }
  handleClickEvent(e:React.MouseEvent) {
    const { pageY, pageX, clientY, clientX, } = getEventCoordinates(e)
    const now = Date.now()
    if (this.lastClickData &&
    now - this.lastClickData.timestamp < clickInterval) {
      this.lastClickData = void 0
      return this.emit('doubleClick', {
        x: pageX, y: pageY, clientX: clientX, clientY: clientY,
      })
    }
  }
  handleTerminatingEvent(e:React.MouseEvent) {
    const { pageY, pageX, } = getEventCoordinates(e)
    this.selecting = false
    this.removeEndListener()
    this.removeMoveListener()
    const inRoot = !this.container || contains(this.container(), e.target as Element)

    const bounds = this.selectRect
    const click = this.isClick(pageX, pageY)
    this.initialEventData = null
    if (click && inRoot) {
      return this.handleClickEvent(e)
    }
    if (!click) {
      return this.emit('select', bounds)
    }
    return this.emit('reset')
  }
  handleMoveEvent(e:React.MouseEvent) {
    if (this.initialEventData === null || this.isDetached) {
      return
    }
    const { x, y, } = this.initialEventData
    const { pageY, pageX, } = getEventCoordinates(e)
    const w = Math.abs(pageX - x)
    const h = Math.abs(pageY - y)
    const left = Math.min(pageX, x)
    const top = Math.min(pageY, y)
    const old = this.selecting
    this.selecting = true
    this.selectRect = {
      top,
      left,
      x: pageX,
      y: pageY,
      right: left + w,
      bottom: top + h,
    }
    if (!old) {
      this.emit('selectStart', this.initialEventData)
    }
    if (!this.isClick(pageX, pageY)) {
      this.emit('selecting', this.selectRect)
    }
    stopDefaultEvent(e)
  }
  handleInitialEvent(e:React.MouseEvent) :void {
    if (this.isDetached) return
    const { clientX, clientY, pageX, pageY, } = getEventCoordinates(e)
    this.initialEventData = {
      x: pageX,
      y: pageY,
      clientX,
      clientY,
    }
    this.emit('beforeSelect', this.initialEventData)
    switch (e.type) {
    case 'mousedown':{
      this.removeEndListener = addEventListener('mouseup', this.handleTerminatingEvent)
      this.removeMoveListener = addEventListener('mousemove', this.handleTerminatingEvent)
    }
    }
  }
}
