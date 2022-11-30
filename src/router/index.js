import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/register/RegisterPage.vue";
import RegisterFormPage from "../views/register/RegisterFormPage.vue";
import RepairStatusPage from "../views/RepairStatusPage.vue";

import DashBoardPage from "../views/DashBoardPage.vue";
import DashboardMemberPage from "../views/dashboard/ManageMemberPage.vue";
import DashboardMaintainerPage from "../views/dashboard/MaintainerListPage.vue";

import DashboardReportPage from "../views/dashboard/ReportListPage.vue";
import DashboardReportDetailPage from "../views/dashboard/ReportDetailPage.vue";
import DashboardConfigApertmentsPage from "../views/apartments/ApartmentsPage.vue";
import DashboardRoomListPage from "../views/apartments/RoomListPage.vue";

import MemberMyRoom from "../views/members/MemberMyRoomPage.vue";
import MemberMyRoomReport from "../views/members/MemberMyRoomReportPage.vue";
import MemberReport from "../views/members/MemberReportPage.vue";
import MemberReportDetail from "../views/members/MemberReportDetailPage.vue";

import UserProfilePage from "../views/UserProfilePage.vue";
import StaffPage from "../views/dashboard/StaffListPage.vue";

import UnAuthPage from "../views/UnAuthPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/unauth",
    name: "unauth",
    component: UnAuthPage,
    meta: { layout: "AppLayoutRegister" },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    props: true,
    meta: { layout: "AppLayoutRegister" },
  },
  {
    path: "/register/form",
    name: "register-form",
    component: RegisterFormPage,
    props: true,
    meta: { layout: "AppLayoutRegister" },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { layout: "AppLayoutRegister" },
  },
  {
    path: "/repair_status",
    name: "repair-status",
    component: RepairStatusPage,
  },
  {
    path: "/dashboard/content",
    name: "dashboard-content",
    component: DashBoardPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/member",
    name: "dashboard-member",
    component: DashboardMemberPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/maintainer",
    name: "dashboard-maintainer",
    component: DashboardMaintainerPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/report",
    name: "dashboard-report",
    component: DashboardReportPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/report/:id",
    name: "dashboard-report-detail",
    component: DashboardReportDetailPage,
    props: true,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/apartment",
    name: "dashboard-apartment",
    component: DashboardConfigApertmentsPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/apartment/:buildingId",
    name: "dashboard-apartment-room",
    component: DashboardRoomListPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/member/myroom",
    name: "member-myroom",
    component: MemberMyRoom,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      userAuth: true,
      layout: "AppLayoutMember",
    },
  },
  {
    path: "/member/myroom/room/:roomNum/:id",
    name: "member-myroom-room-report",
    component: MemberMyRoomReport,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      userAuth: true,
      layout: "AppLayoutMember",
    },
  },
  {
    path: "/member/report",
    name: "member-report",
    component: MemberReport,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      userAuth: true,
      layout: "AppLayoutMember",
    },
  },
  {
    path: "/member/report/detail/:id",
    name: "member-report-detail",
    component: MemberReportDetail,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      userAuth: true,
      layout: "AppLayoutMember",
    },
  },
  {
    path: "/member/profile",
    name: "member-profile",
    component: UserProfilePage,
    meta: {
      requiresAuth: true,
      adminAuth: false,
      userAuth: true,
      layout: "AppLayoutMember",
    },
  },
  {
    path: "/owner/profile",
    name: "owner-profile",
    component: UserProfilePage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/staff",
    name: "dashboard-staff",
    component: StaffPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
      return {
        behavior: 'smooth',
        to: 0
      }
  }
});

router.beforeEach((to, from, next) => {
  let role = localStorage.getItem("role");
  let accessToken = "token";

  if (to.meta.requiresAuth) {
    if (!role || !accessToken) {
      router.push({ path: "/unauth" });
    } else {
      if (to.meta.adminAuth) {
        if (role === "E" || role === "A") {
          return next();
        } else {
          router.push({ path: "/unauth" });
        }
      } else if (to.meta.userAuth) {
        if (role === "C") {
          return next();
        } else {
          router.push({ path: "/unauth" });
        }
      }
    }
  } else {
    return next();
  }
});

export default router;
