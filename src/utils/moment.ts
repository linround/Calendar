import moment from 'moment'
moment.locale('zh-cn', {
  week: {
    dow: 1, // 每周从周一开始
  },
})

export default moment
