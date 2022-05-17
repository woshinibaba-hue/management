import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import { useLoginStore } from './store/useLoginStore'

import './server'
import './permission'

// 重置css样式
import 'normalize.css'
import '@/assets/css/base.less'

import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(createPinia())

const loginStore = useLoginStore()
loginStore.initAction()

app.use(router)

app.mount('#app')
