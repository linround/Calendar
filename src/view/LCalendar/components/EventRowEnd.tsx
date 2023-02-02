import { ISegments } from '../utils/segments/eventSegments'
import React from 'react'

interface IEventRow{
  segments: ISegments[]
}
export function EventRowEnd(props:React.PropsWithChildren<IEventRow>) {
  const { segments, } = props
  return (
    <div>more</div>
  )
}
