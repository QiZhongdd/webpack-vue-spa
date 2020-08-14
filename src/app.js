import Vue from 'vue'
import App from './index.vue'
import '../config/http.js'
import '../assest/global.css'
new Vue({ render: (h) => h(App) }).$mount('#app')
