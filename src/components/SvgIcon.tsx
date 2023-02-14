import { useDynamicSvgImport } from './useDynamicSvgImport'
import React from 'react'

interface IProps {
  iconName:string
  svgProp?:React.SVGProps<SVGSVGElement>
  className?: string
  onClick?: ()=> void
}
function SvgIcon(props:IProps):React.ReactElement {
  const { iconName, svgProp, className, } = props
  const { loading, SvgIcon, } = useDynamicSvgImport(iconName)
  return (
    <>
      {loading && (
        <div>正在加载svg</div>
      )}
      {SvgIcon && (
        <SvgIcon {...svgProp} className={className}></SvgIcon>
      )}
    </>
  )
}

export default SvgIcon
