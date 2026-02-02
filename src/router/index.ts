import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'
import HelpPage from '@/pages/HelpPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/game', name: 'Game', component: GamePage },
  { path: '/help', name: 'Help', component: HelpPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router