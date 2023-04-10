import style from './style/dayBody.module.less'
export function Gutters() {
  return (
    <div></div>
  )
}
export function Days() {
  return (
    <div></div>
  )
}
export function V3DayBodyComponent() {
  return (
    <div className={style.dayBody}>
      <Gutters />
      <Days />
    </div>
  )
}
