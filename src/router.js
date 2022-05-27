import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import HomePage from '../views/HomePage.vue'
// import LoginPage from '../views/LoginPage.vue'
// import RegisterPage from '../views/register/RegisterPage.vue'
// import RegisterSelectPage from '../views/register/RegisterSelectPage.vue'
// import RegisterFormPage from '../views/register/RegisterFormPage.vue'
// import RepairStatusPage from '../views/RepairStatusPage.vue'

// import ApartmentsPage from '../views/apartments/ApartmentsPage.vue'
// import ApartmentsAddPage from '../views/apartments/addPage.vue'
// import ApartmentsSetRoomPage from '../views/apartments/setRoomPage.vue'

// import DashboardPage from '../views/dashboard/ManageMember.vue'
// import DashboardMemberPage from '../views/dashboard/ManageMember.vue'
// import DashboardRoomStatusPage from '../views/dashboard/RoomStatus.vue'
// import DashboardRoomConfigPage from '../views/dashboard/RoomConfig.vue'

// import DashboardReportPage from '../views/dashboard/Report.vue'
// import DashboardReportDetailPage from '../views/dashboard/ReportDetail.vue'
// import DashboardConfigApertmentsPage from '../views/apartments-config/ApartmentsPage.vue'
// import DashboardConfigApertmentsAddPage from '../views/apartments-config/addPage.vue'
// import DashboardConfigApertmentsSetRoomPage from '../views/apartments-config/setRoomPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      layout: 'AppLayoutDefault'
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router