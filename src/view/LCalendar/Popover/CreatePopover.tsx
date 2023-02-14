import React, {
  useMemo,
  useState,
  useEffect,
  useContext
} from 'react'
import {  calcPosition, IDefaultValue } from './helpers'

import { CreatePopoverContent } from './CreatePopoverContent'
import { EventContext, MouseEventContext } from '../props/propsContext'

// 用来存储popover的来源
const popoverCache:{ ref:Element | null} = { ref: null, }


export function CreatePopover() {
  const { showCreatePopover,
    createPopoverRef, dayScrollRef, } = useContext(MouseEventContext)
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

  const onClose = () => {
    const normalEvent = events.filter((e) => !e.isCreate)
    setEvents(normalEvent)
  }
  const onConfirm = () => {
    delete createEvent.isCreate
    delete createEvent.isDragging
    resetEvents(createEvent, {
      ...createEvent,
      name,
    })

  }
  useEffect(() => {
    if (createEvent) {
      const { name, } = createEvent
      setName(name)
    } else {
      setName(undefined)
    }
  }, [createEvent])
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
        />
      }
    </>
  )
}
