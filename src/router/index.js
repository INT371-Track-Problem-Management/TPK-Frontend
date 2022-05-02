import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/Homepage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/register/RegisterPage.vue'
import RegisterSelectPage from '../views/register/RegisterSelectPage.vue'
import RegisterFormPage from '../views/register/RegisterFormPage.vue'
import RepairStatusPage from '../views/RepairStatusPage.vue'

import ApartmentsPage from '../views/apartments/ApartmentsPage.vue'
import ApartmentsAddPage from '../views/apartments/addPage.vue'
import ApartmentsSetRoomPage from '../views/apartments/setRoomPage.vue'

import DashboardPage from '../views/dashboard/ManageMember.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/register/select',
      name: 'register-select',
      component: RegisterSelectPage
    },
    {
      path: '/register/form',
      name: 'register-form',
      component: RegisterFormPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/repair_status',
      name: 'repair-status',
      component: RepairStatusPage
    },

    {
      path: '/apartments',
      name: 'apartments',
      component: ApartmentsPage
    },
    {
      path: '/apartments/add',
      name: 'apartments-add',
      component: ApartmentsAddPage
    },
    {
      path: '/apartments/set_room',
      name: 'apartments-set-room',
      component: ApartmentsSetRoomPage
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },


  ]
})

export default router
