# 记录这个项目的一些细节 API
## [clientHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)
计算 元素的内部高度，包含边距；不包括边框、外边距和水平滚动条（如果存在）

## [offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
计算元素高度，包括边框、内边距和元素的水平滚动条（如果存在）

## [scrollHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)
scrollHeight 的值等于该元素在不使用滚动条的情况下，为了适应视口所需的最小高度。高度的测量方式与`clientHeight`相同。
如果元素的内容不需要垂直滚动条就可以容纳，那么 `scrollHeight` 和 `clientHeight`是相同的。
可以认为这个高度是子元素再父元素内的活动范围。
