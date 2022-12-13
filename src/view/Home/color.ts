export type TColor = string
export interface TStyle {
  backgroundColor: string
  color: string
  fontSize: string
}
export type Home = 'backgroundColor' | 'color'
export const Color = '#ffffff'


export const CalendarStyle:Pick<TStyle, Home> = {
  backgroundColor: '#4975FB',
  color: Color,
}
export const ButtonsStyle:Pick<TStyle, Home> = {
  backgroundColor: '#924DE6',
  color: Color,
}
export const LoadingStyle:Pick<TStyle, Home> = {
  backgroundColor: '#EF5252',
  color: Color,
}
export const ClickStyle:Pick<TStyle, Home> = {
  backgroundColor: '#F59500',
  color: Color,
}
