import Vue from 'vue'
import dayjs from 'dayjs'
Vue.filter('capitalize', (val) => val.toUpperCase())

Vue.filter('lowercase', (val) => {
  if (!val) return ''
  return val.toLowerCase()
})

Vue.filter('readmore', (val) => {
  if (!val) return ''
  val = val.replace(/\s{2,}/g, ' ')
  const strLength = val.length
  if (strLength > 24) {
    val = `${val.slice(0, 42)}...`
  }
  return val
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
})

Vue.filter('readmoreblog', (val) => {
  if (!val) return ''
  val = val.replace(/\s{2,}/g, ' ')
  const strLength = val.length
  if (strLength > 60) {
    val = `${val.slice(0, 59)}...`
  }
  return val
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
})

Vue.filter('labelname', (val) => {
  if (!val) return ''
  val = val.replace(/\s{2,}/g, ' ')
  const strLength = val.length
  if (strLength > 10) {
    val = `${val.slice(0, 8)}...`
  }
  return val
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
})

Vue.filter('sellername', (val) => {
  if (!val) return ''
  val = val.replace(/\s{2,}/g, ' ')
  const strLength = val.length
  if (strLength > 24) {
    val = `${val.slice(0, 15)}...`
  }
  return val
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
})

Vue.filter('formatPrice', (value) => {
  if (!value) return 0
  const val = (value / 1).toFixed(0).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('formatDate', (value) => {
  if (!value) return 'invalid date'
  return dayjs(value).format('DD/MM/YYYY H:mm:ss')
})

Vue.filter('formatDateString', (value) => {
  if (!value) return '-'
  return dayjs(value).format('DD-MMMM-YYYY')
})
