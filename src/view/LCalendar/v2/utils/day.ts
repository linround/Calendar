import localizer from '../../utils/segments/localizer'

export function dayRange(date:Date):Date[] {
  return [localizer.startOf(date, 'day')]
}
