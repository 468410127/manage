import Vue from 'vue'
import App from './App'
import store from './store'
import './common/css/icon.css'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
