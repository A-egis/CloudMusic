import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn')

Vue.filter('views', function (views) {
  views = Number(views)
  return views >= 10000 ? (Math.ceil(views / 10000) + '万') : views
})

Vue.filter('artists', function (arr) {
  let artists = ''
  arr.forEach((item) => {
    artists = artists + item.name + ' / '
  })
  artists = artists.substring(0, artists.length - 2)
  return artists
})

Vue.filter('alias', function (arr) {
  return arr.length === 0 ? '' : `( ${arr[0]} )`
})

Vue.filter('album', function (album) {
  return album.name
})

Vue.filter('duration', function (duration) {
  duration = Number(duration)
  return moment(duration).format('mm:ss')
})

Vue.filter('createTime', function (time) {
  time = Number(time)
  return moment(time).format('YYYY-MM-DD')
})

Vue.filter('commentTime', function (time) {
  time = Number(time)
  const now = moment()
  const today = moment({ hour: 0 })
  const thisYear = moment({ month: 0 })
  if (now.diff(time) < 1 * 60 * 60 * 1000) {
    // 几分钟前的评论
    return moment(time).fromNow()
  } else if (moment(time).isAfter(today)) {
    // 今天几点几分的评论
    return moment(time).format('HH:MM')
  } else if (moment(time).isAfter(thisYear)) {
    // 今年几月几日几时几分的评论
    return moment(time).format('M月D日 HH:MM')
  } else {
    // 某年某月某时某分的评论
    return moment(time).format('YYYY年M月D日 HH:MM')
  }
})
