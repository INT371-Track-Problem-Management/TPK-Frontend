import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/register/RegisterPage.vue";
import RegisterSelectPage from "../views/register/RegisterSelectPage.vue";
import RegisterFormPage from "../views/register/RegisterFormPage.vue";
import RepairStatusPage from "../views/RepairStatusPage.vue";

import ApartmentsPage from "../views/apartments/ApartmentsPage.vue";
import ApartmentsAddPage from "../views/apartments/addPage.vue";
import ApartmentsSetRoomPage from "../views/apartments/setRoomPage.vue";

import DashBoardPage from "../views/DashBoardPage.vue";
import DashboardMemberPage from "../views/dashboard/ManageMember.vue";
import DashboardRoomStatusPage from "../views/dashboard/RoomStatus.vue";
import DashboardRoomListPage from "../views/apartments-config/RoomList.vue";

import DashboardReportPage from "../views/dashboard/ReportList.vue";
import DashboardReportDetailPage from "../views/dashboard/ReportDetail.vue";
import DashboardConfigApertmentsPage from "../views/apartments-config/ApartmentsPage.vue";
import DashboardConfigApertmentsAddPage from "../views/apartments-config/addPage.vue";
import DashboardConfigApertmentsSetRoomPage from "../views/apartments-config/setRoomPage.vue";

import MemberMyRoom from "../views/members/MemberMyRoom.vue";
import MemberMyRoomReport from "../views/members/MemberMyRoomReport.vue";
import MemberReport from "../views/members/MemberReport.vue";
import MemberReportDetail from "../views/members/MemberReportDetail.vue";

import UserProfilePage from "../views/UserProfilePage.vue";
import StaffPage from "../views/dashboard/StaffPage.vue";

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
    path: "/register/select",
    name: "register-select",
    component: RegisterSelectPage,
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
    path: "/apartments",
    name: "apartments",
    component: ApartmentsPage,
  },
  {
    path: "/apartments/add",
    name: "apartments-add",
    component: ApartmentsAddPage,
    meta: { layout: "AppLayoutApartment" },
  },
  {
    path: "/apartments/set_room",
    name: "apartments-set-room",
    component: ApartmentsSetRoomPage,
    meta: { layout: "AppLayoutApartment" },
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
    path: "/dashboard/room/status",
    name: "dashboard-room-status",
    component: DashboardRoomStatusPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/room/config",
    name: "dashboard-room-config",
    component: DashboardRoomListPage,
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
    path: "/dashboard/config/apartment",
    name: "dashboard-config-apartment",
    component: DashboardConfigApertmentsPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/config/apartment/add",
    name: "dashboard-config-apartment-add",
    component: DashboardConfigApertmentsAddPage,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,
      layout: "AppLayoutAdmin",
    },
  },
  {
    path: "/dashboard/config/apartment/set_room",
    name: "dashboard-config-apartment-set_room",
    component: DashboardConfigApertmentsSetRoomPage,
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
