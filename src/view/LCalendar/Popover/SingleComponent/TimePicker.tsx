import React, { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useClick,
  useInteractions,
  FloatingFocusManager
} from '@floating-ui/react'
import style from './timePicker.module.less'
import helpers from './helpers'

interface IProps {
  time: number
}
export default function TimePicker(props: React.PropsWithChildren<IProps>) {
  const { time, children, } = props
  const [open, setOpen] = useState(false)

  const { x, y, refs, strategy, context, } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'none', }),
      shift()
    ],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps, } = useInteractions([
    click,
    dismiss
  ])


  return (
    <div>
      <div
        className={style.pickerTimeView}
        ref={refs.setReference}
        {...getReferenceProps()} >
      </div>
      <input
        style={{
          width: 60,
        }}
        onChange={() => {}}
        value={helpers.getTime(time)}/>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={style.pickerContainer}
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 200,
            }}
            {...getFloatingProps()}
          >
            popover
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}

