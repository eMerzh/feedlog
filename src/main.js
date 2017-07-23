// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('../node_modules/bootstrap/scss/bootstrap.scss')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.filter('two_digits', function (value){
  if (value.toString().length <= 1) {
    return '0' + value.toString();
  } else {
    return value.toString();
  }
})
