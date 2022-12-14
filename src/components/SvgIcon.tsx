import { useDynamicSvgImport } from './useDynamicSvgImport'
import React from 'react'

interface IProps {
  iconName:string
  wrapperStyle?:string
  svgProp?:React.SVGProps<SVGSVGElement>
}
function SvgIcon(props:IProps) {
  const { iconName, wrapperStyle, svgProp, } = props
  const { loading, SvgIcon, } = useDynamicSvgImport(iconName)
  return (
    <>
      {loading && (
        <div>正在加载svg</div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle}>
          <SvgIcon {...svgProp}></SvgIcon>
        </div>
      )}
    </>
  )
}

export default SvgIcon
