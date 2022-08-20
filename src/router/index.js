import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/register/RegisterPage.vue'
import RegisterSelectPage from '../views/register/RegisterSelectPage.vue'
import RegisterFormPage from '../views/register/RegisterFormPage.vue'
import RepairStatusPage from '../views/RepairStatusPage.vue'

import ApartmentsPage from '../views/apartments/ApartmentsPage.vue'
import ApartmentsAddPage from '../views/apartments/addPage.vue'
import ApartmentsSetRoomPage from '../views/apartments/setRoomPage.vue'

import DashboardPage from '../views/dashboard/ManageMember.vue'
import DashboardMemberPage from '../views/dashboard/ManageMember.vue'
import DashboardRoomStatusPage from '../views/dashboard/RoomStatus.vue'
import DashboardRoomConfigPage from '../views/dashboard/RoomConfig.vue'

import DashboardReportPage from '../views/dashboard/ReportList.vue'
import DashboardReportDetailPage from '../views/dashboard/ReportDetail.vue'
import DashboardConfigApertmentsPage from '../views/apartments-config/ApartmentsPage.vue'
import DashboardConfigApertmentsAddPage from '../views/apartments-config/addPage.vue'
import DashboardConfigApertmentsSetRoomPage from '../views/apartments-config/setRoomPage.vue'

import MemberMydorm from '../views/members/MemberMydorm.vue'
import MemberReport from '../views/members/MemberReport.vue'
import MemberReportDetail from '../views/members/MemberReportDetail.vue'

  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      props: true,
      meta: { layout: 'AppLayoutRegister' }
    },
    {
      path: '/register/select',
      name: 'register-select',
      component: RegisterSelectPage,
      props: true,
      meta: { layout: 'AppLayoutRegister' }
    },
    {
      path: '/register/form',
      name: 'register-form',
      component: RegisterFormPage,
      props: true,
      meta: { layout: 'AppLayoutRegister' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { layout: 'AppLayoutRegister' }
    },
    {
      path: '/repair_status',
      name: 'repair-status',
      component: RepairStatusPage,
    },

    {
      path: '/apartments',
      name: 'apartments',
      component: ApartmentsPage,
    },
    {
      path: '/apartments/add',
      name: 'apartments-add',
      component: ApartmentsAddPage,
      meta: { layout: 'AppLayoutApartment' }
    },
    {
      path: '/apartments/set_room',
      name: 'apartments-set-room',
      component: ApartmentsSetRoomPage,
      meta: { layout: 'AppLayoutApartment' }
    },
    
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/member',
      name: 'dashboard-member',
      component: DashboardMemberPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/room/status',
      name: 'dashboard-room-status',
      component: DashboardRoomStatusPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/room/config',
      name: 'dashboard-room-config',
      component: DashboardRoomConfigPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/report',
      name: 'dashboard-report',
      component: DashboardReportPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/report/:code',
      name: 'dashboard-report-detail',
      component: DashboardReportDetailPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/config/apartment',
      name: 'dashboard-config-apartment',
      component: DashboardConfigApertmentsPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/config/apartment/add',
      name: 'dashboard-config-apartment-add',
      component: DashboardConfigApertmentsAddPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/dashboard/config/apartment/set_room',
      name: 'dashboard-config-apartment-set_room',
      component: DashboardConfigApertmentsSetRoomPage,
      meta: { layout: 'AppLayoutAdmin' }
    },
    {
      path: '/member/mydorm',
      name: 'member-mydorm',
      component: MemberMydorm,
      meta: { layout: 'AppLayoutMember' }
    },
    {
      path: '/member/report',
      name: 'member-report',
      component: MemberReport,
      meta: { layout: 'AppLayoutMember' }
    },
    // {
    //   path: '/member/report/detail/:id',
    //   name: 'member-report-detail',
    //   props: true ,
    //   component: MemberReportDetail,

    //   meta: { layout: 'AppLayoutMember' }
    // },
    {
      path: '/member/report/detail',
      name: 'member-report-detail',
      component: MemberReportDetail,
      meta: { layout: 'AppLayoutMember' }
    },
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
