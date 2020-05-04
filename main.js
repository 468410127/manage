import Vue from 'vue'
import App from './App'
import store from './store'
import './common/css/icon.css'

import api from './common/js/request.js';

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
