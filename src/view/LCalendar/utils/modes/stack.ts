import { CalendarEventOverlapMode } from '../calendar'
import {
  getOverlapGroupHandler, getVisuals, CalendarEventVisual, getNormalizedRange, hasOverlap
} from './common'
import { getTimestampIdentifier } from '../timesStamp'


const FULL_WIDTH = 100

const DEFAULT_OFFSET = 5

const WIDTH_MULTIPLIER = 1.7
export interface Node {
  parent: Node | null
  sibling: boolean
  index: number
  visual: CalendarEventVisual
  start: number
  end: number
  children: Node[]
}
export interface Group {
  start:number
  end:number
  visuals: CalendarEventVisual[]
}
export function getGroups(visuals:CalendarEventVisual[], dayStart:number):Group[] {
  const groups:Group[] = []
  for (const visual of visuals) {
    const [start, end] = getNormalizedRange(visual.event, dayStart)
    let added = false
    for (const group of groups) {
      if (hasOverlap(
        start, end, group.start, group.end
      )) {
        group.visuals.push(visual)
        group.end = Math.max(group.end, end)
        added = true
        break
      }
    }
    if (!added) {
      groups.push({
        start, end, visuals: [visual],
      })
    }
  }
  return  groups

}


export function getNode(visual:CalendarEventVisual, dayStart: number):Node {
  const [start, end] = getNormalizedRange(visual.event, dayStart)
  return  {
    parent: null,
    sibling: true,
    index: 0,
    visual,
    start,
    end,
    children: [],
  }
}

export function getOverlappingIndices(node:Node, nodes:Node[]):number[] {
  const indices: number[] = []
  for (const other of nodes) {
    if (hasOverlap(
      node.start, node.end, other.start, other.end
    )) {
      indices.push(other.index)
    }
  }
  return indices
}

export function getNextIndex(node:Node, nodes:Node[]):number|false {
  // 获取堆叠指数
  const indices = getOverlappingIndices(node, nodes)
  // 默认从小到大
  indices.sort()
  for (let i = 0; i < indices.length;i++) {
    if (i < indices[i]) {
      return i
    }
  }
  return false
}
function getParent(node:Node, nodes:Node[]):Node|null {
  let parent:Node|null = null
  for (const other of nodes) {
    if (hasOverlap(
      node.start, node.end, other.start, other.end
    ) &&
      (parent === null || other.index > parent.index)) {
      parent = other
    }
  }
  return parent
}

// 对于这里有一些疑问
function addTime (identifier: number, minutes: number): number {
  const removeMinutes = identifier % 100
  const totalMinutes = removeMinutes + minutes
  const addHours = Math.floor(totalMinutes / 60)
  const addMinutes = totalMinutes % 60

  return identifier - removeMinutes + (addHours * 100) + addMinutes
}

function getOverlappingRange(
  node:Node, nodes:Node[], indexMin: number, indexMax:number, returnFirstColumn = false
): Node[] {
  const overlapping:Node[] = []
  for (const other of nodes) {
    if (other.index >= indexMin && other.index <= indexMax && hasOverlap(
      node.start, node.end, other.start, other.end
    )) {
      overlapping.push(other)
    }
  }
  if (returnFirstColumn && overlapping.length > 0) {
    const first = overlapping.reduce((min, n) => Math.min(min, n.index), overlapping[0].index)

    return overlapping.filter((n) => n.index === first)
  }
  return overlapping

}
function getMaxChildIndex(node:Node):number {
  let max = node.index
  for (const child of node.children) {
    const childMax = getMaxChildIndex(child)
    if (childMax > max) {
      max = childMax
    }
  }
  return max
}
function getColumnWidthMultiplier(node:Node, nodes:Node[]):number {
  if (!node.children.length) {
    return 1
  }
  const maxColumn = node.index + nodes.length
  const minColumn = node.children.reduce((min, c) => Math.min(min, c.index), maxColumn)
  return minColumn - node.index
}


function hasFullWidth(
  node:Node, nodes:Node[], overlapThreshold: number
):boolean {
  for (const other of nodes) {
    if (other !== node &&
    other.index > node.index &&
    hasOverlap(
      node.start, addTime(node.start, overlapThreshold), other.start, other.end
    )) {
      return false
    }
  }
  return true
}

function calculateBounds(nodes:Node[], overlapThreshold:number):void {
  for (const node of nodes) {
    const { visual, parent, } = node
    const columns = getMaxChildIndex(node) + 1
    const spaceLeft = parent ? parent.visual.left : 0
    const spaceWidth = FULL_WIDTH - spaceLeft
    const offset = Math.min(DEFAULT_OFFSET, FULL_WIDTH / columns)
    const columnWidthMultiplier = getColumnWidthMultiplier(node, nodes)
    const columnOffset = spaceWidth / (columns - node.index + 1)
    const columnWidth = spaceWidth / (columns - node.index + (node.sibling ? 1 : 0)) * columnWidthMultiplier

    if (parent) {
      visual.left = node.sibling ?
        spaceLeft + columnOffset :
        spaceLeft + offset
    }
    visual.width = hasFullWidth(
      node, nodes, overlapThreshold
    ) ?
      FULL_WIDTH - visual.left :
      Math.min(FULL_WIDTH - visual.left, columnWidth * WIDTH_MULTIPLIER)
  }
}

export const stack:CalendarEventOverlapMode = (
  events,
  firstWeekday,
  overlapThreshold
) => {
  const handler = getOverlapGroupHandler(firstWeekday)
  return (
    day, dayEvents, timed, reset
  ) => {
    if (!timed) {
      return handler.getVisuals(
        day, dayEvents, timed, reset
      )
    }
    // 当日的时间
    const dayStart = getTimestampIdentifier(day)
    // 设置 columnCount,column,left,width基本属性，并按照规则排序
    const visuals = getVisuals(dayEvents, dayStart)
    const groups = getGroups(visuals, dayStart)
    for (const group of groups) {
      const nodes: Node[] = []

      for (const visual of group.visuals) {
        const child = getNode(visual, dayStart)
        const index = getNextIndex(child, nodes)
        if (index === false) {
          const parent = getParent(child, nodes)
          if (parent) {
            child.parent = parent
            child.sibling = hasOverlap(
              child.start, child.end, parent.start, addTime(parent.end, overlapThreshold)
            )
            child.index = parent.index + 1
            parent.children.push(child)
          }
        } else {
          const [parent] = getOverlappingRange(
            child, nodes, index  - 1, index - 1
          )
          const children = getOverlappingRange(
            child, nodes, index + 1, index + nodes.length, true
          )
          child.children = children
          child.index = index
          if (parent) {
            child.parent = parent
            child.sibling = hasOverlap(
              child.start, child.end, parent.start, addTime(parent.start, overlapThreshold)
            )
            parent.children.push(child)
          }
          for (const grand of children) {
            if (grand.parent === parent) {
              grand.parent = child
            }
            const grandNext = (grand.index - child.index) <= 1
            if (grandNext && child.sibling &&
            hasOverlap(
              child.start, addTime(child.start, overlapThreshold), grand.start, grand.end
            )) {
              grand.sibling = true
            }
          }
        }
        nodes.push(child)
      }
      calculateBounds(nodes, overlapThreshold)
    }
    visuals.sort((a, b) => (a.left - b.left) ||
      (a.event.startTimestampIdentifier - b.event.startTimestampIdentifier))
    return visuals
  }
}
