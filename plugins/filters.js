import Vue from 'vue'
import moment from 'moment'

Vue.filter('upper', val => val.toUpperCase())
Vue.filter('date' , (date, locale, format) => moment(date)
  .locale(locale)
  .format(format))