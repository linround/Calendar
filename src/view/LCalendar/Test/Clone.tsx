import React from 'react'
import classnames from 'classnames'

//  React.cloneElement
// 参数1 要复制的节点
// 参数2 所制值节点的props(包括children)
// 参数3 要传给复制节点的子节点（优先级高于props中的children）

const Timeline = (props:any) => {
  // ...
  // ...
  console.log(props.children)
  const itemCount = React.Children.count(props.children)
  const items = React.Children.map(props.children, (item, index) => React.cloneElement(
    item, {
      children: (<div className='div---'>div</div>),
      className: classnames([
        item.props.className,
        'timeline-item',
        index === itemCount - 1 ? 'timeline-item-last' : ''
      ]),
    }, <div className='div---+++'>div</div>
  ))
  return (<div className={'timeline'}>{ items }</div>)
}
export const MyTimeline = () => (
  <Timeline>
    <div className={'888888'} key={8888}>1</div>
    <div>2</div>
    <div>3</div>
  </Timeline>
)
