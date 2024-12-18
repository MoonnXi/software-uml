import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'boxicons'
// 引入 Bootstrap 和 Bootswatch 主题
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/cerulean/bootstrap.min.css' // 选择你喜欢的主题
import 'bootstrap-icons/font/bootstrap-icons.css' // 如果需要 Bootstrap 图标

// 引入 BootstrapVue 3
import { BootstrapVue3 } from 'bootstrap-vue-3'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.use(store)

app.mount('#app')
