import { useDynamicSvgImport } from './useDynamicSvgImport'
import React from 'react'
const SMALL_SIZE = 22

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
          color: 'red',
        }}></SvgIcon>
      )}
    </>
  )
}

export default SvgIcon
