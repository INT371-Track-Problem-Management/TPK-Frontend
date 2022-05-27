<template>
  <div class="font-primary">

    <NavMenuUser class="w-full fixed z-50" :menuList="menuList"/>
    <SideMenu class="w-72 h-full fixed pt-16 hidden xl:block z-50" :menuList="menuList" />
    <div class="pl-8 xl:pl-80 pt-20 pr-8">
      <slot />
    </div>

  </div>
</template>

<script>

  import NavMenuUser from "@/components/NavMenuUser.vue"
  import SideMenu from "@/components/SideMenu.vue"

  export default {
    name: 'admin',
    components: { NavMenuUser, SideMenu },

    data() {
      return {
        menuList: [
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>',
            name: "ข้อมูลผู้พัก",
            url: "/dashboard/member",
            activeDropdown: false,
            isDropdown: false,
            menuItems: [],
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" /></svg>',
            name: "ห้อง",
            url: "/dashboard/room",
            activeDropdown: false,
            isDropdown: true,
            menuItems: [
              {
                name: "ห้องว่าง",
                url: "/dashboard/room/status",
              },
              {
                name: "ผังห้อง",
                url: "/dashboard/room/config",
              },
            ],
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>',
            name: "รายงาน",
            url: "/dashboard/report",
            activeDropdown: false,
            isDropdown: false,
            menuItems: [],
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>',
            name: "ตั้งค่า",
            url: "/dashboard/config",
            activeDropdown: false,
            isDropdown: true,
            menuItems: [
              {
                name: "อาพาร์ตเม้นต์",
                url: "/dashboard/config/apartment",
              },
            ],
          },
        ]

      }
    }
  }
</script>