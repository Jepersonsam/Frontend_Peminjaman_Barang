// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { QrcodeStream } from 'vue-qrcode-reader'
import "simple-keyboard/build/css/index.css";

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.component('qrcode-stream', QrcodeStream)

app.mount('#app')
