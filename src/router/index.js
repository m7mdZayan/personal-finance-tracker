import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChartReportPage from '../views/ChartReportPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/report', component: ChartReportPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
