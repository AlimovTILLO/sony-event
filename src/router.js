import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './views/Welcome.vue'
import Record from './views/Record.vue'
import GetStarted from './views/GetStarted.vue'
import Info from './views/Info.vue'
import Finish from './views/Finish.vue'
const routes = [
    { path: '/', component: Welcome },
    { path: '/start', component: GetStarted },
    { path: '/info', component: Info },
    { path: '/record', component: Record },
    { path: '/thank', component: Finish },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
