# 记录这个项目的一些细节 API
## [clientHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)
计算 元素的内部高度，包含边距；不包括边框、外边距和水平滚动条（如果存在）

## [offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
计算元素高度，包括边框、内边距和元素的水平滚动条（如果存在）

## [scrollHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)
scrollHeight 的值等于该元素在不使用滚动条的情况下，为了适应视口所需的最小高度。高度的测量方式与`clientHeight`相同。
如果元素的内容不需要垂直滚动条就可以容纳，那么 `scrollHeight` 和 `clientHeight`是相同的。
可以认为这个高度是子元素再父元素内的活动范围。

## [scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)
- 如果一个元素不能滚动 `scrollTop` 被设置为 0
- `scrollTop` 值小于0， `scrollTop`被设置为 0
- 如果超出了这个容器可滚动的值，scrollTop会被设置为最大值

## pageY
> 场景如下：设置 body 溢出滚动；设置子元素高于body    

这个时候 文档页发生滚动。pageY指的就是到文档顶部的距离。
## 事件时长的控制
- allDay 属性的事件、事件时长大于24小时的事件，属于一类事件
- 结束时间不能早于开始时间，如果结束时间早于开始时间，禁止创建该事件。
