function parseTime() {
  const patterns = [
    // 1, 12, 123, 1234, 12345, 123456
    [/^(\d+)$/, '$1'],
    // :1, :2, :3, :4 ... :9
    [/^:(\d)$/, '$10'],
    // :1, :12, :123, :1234 ...
    [/^:(\d+)/, '$1'],
    // 6:06, 5:59, 5:8
    [/^(\d):([7-9])$/, '0$10$2'],
    [/^(\d):(\d\d)$/, '$1$2'],
    [/^(\d):(\d{1,})$/, '0$1$20'],
    // 10:8, 10:10, 10:34
    [/^(\d\d):([7-9])$/, '$10$2'],
    [/^(\d\d):(\d)$/, '$1$20'],
    [/^(\d\d):(\d*)$/, '$1$2'],
    // 123:4, 1234:456
    [/^(\d{3,}):(\d)$/, '$10$2'],
    [/^(\d{3,}):(\d{2,})/, '$1$2'],
    //
    [/^(\d):(\d):(\d)$/, '0$10$20$3'],
    [/^(\d{1,2}):(\d):(\d\d)/, '$10$2$3']
  ]
  let length = patterns.length
  return function (input) {
    let str = input
    var time = new Date(),
      am = false, pm = false, h = false, m = false, s = false

    if (typeof str === 'undefined' || !str.toLowerCase) {
      return null
    }

    str = str.toLowerCase()
    am = /a/.test(str)
    pm = am ? false : /p/.test(str)
    str = str.replace(/[^0-9:]/g, '')
      .replace(/:+/g, ':')

    for (var k = 0; k < length; k = k + 1) {
      if (patterns[k][0].test(str)) {
        str = str.replace(patterns[k][0], patterns[k][1])
        break
      }
    }
    str = str.replace(/:/g, '')

    if (str.length === 1) {
      h = str
    } else if (str.length === 2) {
      h = str
    } else if (str.length === 3 || str.length === 5) {
      h = str.substr(0, 1)
      m = str.substr(1, 2)
      s = str.substr(3, 2)
    } else if (str.length === 4 || str.length > 5) {
      h = str.substr(0, 2)
      m = str.substr(2, 2)
      s = str.substr(4, 2)
    }

    if (str.length > 0 && str.length < 5) {
      if (str.length < 3) {
        m = 0
      }
      s = 0
    }

    if (h === false || m === false || s === false) {
      return false
    }

    h = parseInt(h, 10)
    m = parseInt(m, 10)
    s = parseInt(s, 10)

    if (am && h === 12) {
      h = 0
    } else if (pm && h < 12) {
      h = h + 12
    }

    if (h > 24) {
      if (str.length >= 6) {
        return (str.substr(0, 5))
      }
      return parseTime(str + '0' + (am ? 'a' : '') + (pm ? 'p' : ''))

    }
    time.setHours(
      h, m, s
    )
    return time

  }
}
export default parseTime()
