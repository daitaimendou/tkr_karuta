import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import './assets/scss/custom.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueYoutube from 'vue-youtube'

library.add(faCircle, faTimes, faPlay, faStop, faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(VueYoutube)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
