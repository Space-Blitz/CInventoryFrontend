import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
// Vue.loadScript("https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js")
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
