// import { createApp } from 'vue'
// import App from './config/index.vue'
// import ElementPlus from 'element-plus'
// import './assets/main.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
//
// const app = createApp(App)
//
// // 使用element-plus 并且设置全局的大小
// app.use(ElementPlus, {
//     locale: locale,
//     // 支持 large、default、small
//     size: Cookies.get('size') || 'default'
// })
//
// app.mount('#app')

import { createApp } from 'vue'
import App from './config/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/main.css'


const app = createApp(App)

app.use(ElementPlus, locale)
app.mount('#app')