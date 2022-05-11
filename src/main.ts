import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import './server'

// 重置css样式
import 'normalize.css'
import '@/assets/css/base.less'

import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
