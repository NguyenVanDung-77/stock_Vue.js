import { createApp } from 'vue'
import './style.css'
import App from './AppWithRouter.vue'
import router from './router'

/**
 * Khởi tạo Vue app với Router
 * Demo: Vue Router cho SPA navigation
 */

const app = createApp(App)
app.use(router)
app.mount('#app')
