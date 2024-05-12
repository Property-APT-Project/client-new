import Login from "@/components/user/Login.vue"
import Profile from "@/components/user/Profile.vue"
import Signup from "@/components/user/Signup.vue"
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginForm',
      component: Login
    },
    {
      path: '/join',
      name: 'signupForm',
      component: Signup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})

export default router
