import React, {
  useMemo,
  useState,
  useEffect,
  useContext, useCallback
} from 'react'
import {  calcPosition, IDefaultValue } from './helpers'

import { CreatePopoverContent } from './CreatePopoverContent'
import { EventContext, MouseEventContext } from '../props/propsContext'
import { handleCreateEvent } from '../../../api/event'
import { SUCCESS_CODE } from '../../../request'

// 用来存储popover的来源
const popoverCache:{ ref:Element | null} = { ref: null, }


export function CreatePopover() {
  const { showCreatePopover,
    createPopoverRef, dayScrollRef, updateEventList, } = useContext(MouseEventContext)
  const { events, setEvents, resetEvents, } = useContext(EventContext)

  const createEvent = useMemo(() => events.filter((e) => e.isCreate)[0], [events])

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  useEffect(() => {
    if (createPopoverRef) {
      const { left, top, } = calcPosition(createPopoverRef, dayScrollRef as Element)
      popoverCache.ref = createPopoverRef
      // 这里无法在全局处理
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
      return
    }
  }, [createPopoverRef?.getBoundingClientRect(), createPopoverRef])











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
    const { code, } = await handleCreateEvent(createEvent)
    if (code !== SUCCESS_CODE) {
      console.log('创建事件失败')
      return
    }
    updateEventList()
    // resetEvents(createEvent, {
    //   ...createEvent,
    //   name,
    //   location,
    // })
  }















  function clearState() {
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
  useEffect(() => {
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
        <CreatePopoverContent
          left={left}
          top={top}
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
      }
    </>
  )
}
