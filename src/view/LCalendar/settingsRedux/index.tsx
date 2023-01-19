import { configureStore } from '@reduxjs/toolkit'
import { parseDate } from '../utils/timesStamp'
import {
  ISettingState, ICalendarType, IStartType
} from './type'

// 初始值配置
const settingState:ISettingState = {
  intervalWidth: 60,
  type: 'day',
  start: parseDate(new Date()).date,
}

// 定义Reducer
function settingReducer(state = settingState) {
  return state
}




// 定义Store
const settingStore = configureStore({
  reducer: settingReducer,
})


// 定义selector
const intervalWidthSelector = (state: ISettingState):number => state.intervalWidth
const typeValueSelector = (state: ISettingState):ICalendarType => state.type
const startValueSelector = (state: ISettingState):IStartType => state.start



// 获取值
const store = settingStore.getState()
export const intervalWidthVal = intervalWidthSelector(store)
export const typeValue = typeValueSelector(store)
export const startValue = startValueSelector(store)
