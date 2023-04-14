export type IEventAction = 'normal'|'created'|'dragged'|'create'

export const CREATE_ACTION = 'create' // 点击空白处 创建事件
export const CREATED_ACTION = 'created' // 点击的是新建的事件
export const DRAGGED_ACTION = 'dragged'// 被创建的拖拽事件的副本
export const NORMAL_ACTION = 'normal' // 普通的已经创建的事件

