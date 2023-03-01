import React, {
  useMemo,
  useState,
  useContext, useCallback, useLayoutEffect, createRef
} from 'react'
import { SUCCESS_CODE } from '../../../request'
import { handleCreateEvent } from '../../../api/event'
import {  calcPosition, IDefaultValue } from './helpers'
import { CreatePopoverContent } from './CreatePopoverContent'
import { EventContext, MouseEventContext } from '../props/propsContext'
import styles from './createEventPopover.module.less'
// 用来存储popover的来源
const popoverCache:{ ref:Element | null} = { ref: null, }


export function CreatePopover() {
  const { showCreatePopover,
    createPopoverRef, dayScrollRef, updateEventList, clearPagePopover, } = useContext(MouseEventContext)
  const { events, setEvents, } = useContext(EventContext)

  const createEvent = useMemo(() => events.filter((e) => e.isCreate)[0], [events])

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const eventRef = createRef<HTMLDivElement|undefined>()

  // 此处使用 useLayoutEffect 来优化页面抖动的问题
  useLayoutEffect(() => {
    if (createPopoverRef && eventRef.current) {
      const { left, top, } = calcPosition(
        createPopoverRef, dayScrollRef as Element, eventRef.current
      )
      popoverCache.ref = createPopoverRef
      // 这里无法在全局处理
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
      return
    }
  }, [createPopoverRef?.getBoundingClientRect(), createPopoverRef, eventRef.current])











  const [name, setName] = useState<IDefaultValue>()
  const [location, setLocation] = useState<string|undefined>()
  const [start, setStart] = useState(Date.now())
  const [end, setEnd] = useState(Date.now())







  const onClose = useCallback(() => {
    const normalEvent = events.filter((e) => !e.isCreate)
    setEvents(normalEvent)
  }, [events])

  const onConfirm = async () => {
    delete createEvent.isCreate
    delete createEvent.isDragging
    delete createEvent.id
    createEvent.name = name
    createEvent.location = location
    const { code, } = await handleCreateEvent(createEvent)
    if (code === SUCCESS_CODE) {
      clearState()
      updateEventList()
      return
    }
  }















  function clearState() {
    clearPagePopover()
    setName(undefined)
    setLocation(undefined)
    setStart(Date.now())
    setEnd(Date.now())
  }
  function init() {
    const { name, location, end, start, } = createEvent
    setName(name)
    setLocation(location)
    setStart(start)
    setEnd(end)
  }
  useLayoutEffect(() => {
    if (createEvent) {
      init()
    } else {
      clearState()
    }
  }, [createEvent?.start, createEvent?.end])


  return (
    <>
      {
        (createPopoverRef && showCreatePopover) &&
        <div
          className={styles.createEventPopoverContainer}
          ref={eventRef as React.ForwardedRef<HTMLDivElement>}
          style={{ left, top, }}>
          <CreatePopoverContent
            onClose={onClose}
            onConfirm={onConfirm}
            name={name}
            setName={setName}
            location={location}
            setLocation={setLocation}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
          />
        </div>

      }
    </>
  )
}
