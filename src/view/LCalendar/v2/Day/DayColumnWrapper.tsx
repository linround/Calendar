import React from 'react'


interface IProps {
  innerRef: React.ForwardedRef<HTMLDivElement | null> | undefined
  className: string
  style: React.StyleHTMLAttributes<any>
}
type IComponentProps = React.PropsWithChildren<Partial<IProps>>

const Component = ({ innerRef, children, style, className, }:IComponentProps) => (
  <div style={style} className={className} ref={innerRef}>
    {children}
  </div>
)

export const DayColumnWrapper = React.forwardRef((props:IComponentProps, ref:React.ForwardedRef<HTMLDivElement|null>) => (
  <Component  {...props} innerRef={ref} />
))
