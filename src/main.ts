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
// import '@/assets/css/variable.less'

import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(createPinia())

const loginStore = useLoginStore()
loginStore.initAction()

app.use(router)

app.mount('#app')

console.log(
  [
    '                   _ooOoo_',
    '                  o8888888o',
    '                  88" . "88',
    '                  (| -_- |)',
    '                  O\\  =  /O',
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    '            /  \\\\|||  :  |||//  \\',
    '           /  _||||| -:- |||||-  \\',
    '           |   | \\\\\\  -  /// |   |',
    "           | \\_|  ''\\---/''  |   |",
    '           \\  .-\\__  `-`  ___/-. /',
    "         ___`. .'  /--.--\\  `. . __",
    '      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
    '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
    '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '         佛祖保佑       永无BUG'
  ].join('\n')
)
