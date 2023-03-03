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
  const { SvgIcon, } = useDynamicSvgImport(iconName)
  return (
    <>
      {SvgIcon && (
        <SvgIcon {...svgProp} className={className}></SvgIcon>
      )}
    </>
  )
}

export default SvgIcon
