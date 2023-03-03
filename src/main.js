import { createApp } from 'vue'
import App from './config/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/main.css'


const app = createApp(App)

app.use(ElementPlus, locale)
app.mount('#app')

