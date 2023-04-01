import localizer from '../../utils/segments/localizer'


interface IGetSlotMetricsParams {
  min: Date
  max:Date
  step: number
  timeslots: number
}
interface IGetSlotMetricsResponse{
  groups:Date[][]
}
export function getSlotMetrics(params:IGetSlotMetricsParams):IGetSlotMetricsResponse {
  const {
    min: start,
    max: end,
    step, // 一个分组种，每个小格代表的值
    timeslots, // 一个分组种，小格的数目
  } = params
  // 因为00：00 到23：59 会少一分钟，所以这里加一分钟进行补充
  const totalMin = 1 + localizer.getTotalMin(start, end)
  // 总分钟数进行分组
  // 每一组timeslots 格子  每个格子 step 时间数
  const numGroups = Math.ceil((totalMin - 1) / (step * timeslots))
  // 总的格子数
  const numSlots = numGroups * timeslots
  // 所有的分组项
  const groups = new Array(numGroups)
  // 所有的分组项种的所有小格
  const slots = new Array(numSlots)
  // 为每个分组填充值
  for (let g = 0;g < numGroups;g++) {
    // 根据每个分组小格数目 定义该分组
    groups[g] = new Array(timeslots)
    // 对每个分组的小格进行处理
    for (let s = 0;s < timeslots;s++) {
      const slotIndex = (g * timeslots) + s
      const minFromStart = slotIndex * step
      const dateTime = localizer.getSlotDate(start, minFromStart)
      slots[slotIndex] =  dateTime
      groups[g][s] = dateTime
    }
  }
  const lastSlot = slots.length * step
  slots.push(localizer.getSlotDate(start, lastSlot))
  return {
    groups,
  }
}
