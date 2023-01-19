export type ICalendarType = 'day' | 'month' | 'week' // 视图的类型
export type IStartType = string | number | Date // 开始时间

export interface ISettingState {
  intervalWidth: number // 左侧时间值的宽度
  type: ICalendarType
  start: IStartType
}
