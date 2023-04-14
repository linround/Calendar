import { IEventAction } from './index'

class MouseDownController {
  public action :IEventAction | ''
  constructor() {
    this.action = ''
    this.setState = this.setState.bind(this)
    this.clearState = this.clearState.bind(this)
  }
  setState(action:IEventAction):boolean {
    // 对于以及触发了mousedown的不可以再次触发
    if (this.action !== '') {
      return false
    }
    this.action = action
    return true
  }
  clearState() {
    this.action = ''
  }
}

export const mousedownController = new MouseDownController()
