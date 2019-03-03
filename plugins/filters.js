import Vue from 'vue'
import moment from 'moment'

Vue.filter('upper', val => val.toUpperCase())

Vue.filter('date' , (date, locale, format) => moment(date)
  .locale(locale)
  .format(format))

Vue.filter('limit', (str, max) => {
  var length = str.length
  if(length > max) return `${str.substring(0,max)}...`
  return str
})