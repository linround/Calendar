import { useDynamicSvgImport } from './useDynamicSvgImport'
import React from 'react'
export const SMALL_SIZE = 22
export const MIDDLE_SIZE = 30

interface IProps {
  iconName:string
  svgProp?:React.SVGProps<SVGSVGElement>
  className?: string
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
        <SvgIcon {...svgProp} className={className} style={{
          width: SMALL_SIZE,
          height: 'auto',
        }}></SvgIcon>
      )}
    </>
  )
}

export default SvgIcon
