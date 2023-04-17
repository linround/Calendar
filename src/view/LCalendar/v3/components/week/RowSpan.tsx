
interface IProps {
  slots:number
  gap:number
}
export function RowSpan(props:IProps) {
  const { slots, gap, } = props
  const width = ((Math.abs(gap) / slots) * 100) + '%'
  return (
    <div
      style={{
        flexBasis: width,
        maxWidth: width,
      }}
    />
  )
}
