import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './server'

// 重置css样式
import 'normalize.css'

import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).mount('#app')
