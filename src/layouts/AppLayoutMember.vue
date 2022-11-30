<template>
  <div class="font-primary">
    <NavMenuUser class="w-full fixed z-[60]" :menuList="menuList" />
    <SideMenuMember
      class="w-72 h-full fixed pt-16 hidden xl:block z-50"
      :menuList="menuList"
    />
    <div class="pl-8 xl:pl-80 pt-20 pr-8">
      <slot />
    </div>
  </div>
</template>

<script>
import NavMenuUser from "@/components/navigation/NavMenuUser.vue";
import SideMenuMember from "@/components/navigation/SideMenuMember.vue";

export default {
  components: { NavMenuUser, SideMenuMember },

  data() {
    return {
      menuList: [
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" /></svg>',
          name: "ห้องพักของฉัน",
          url: "/member/myroom",
          activeDropdown: false,
          isDropdown: false,
          isActive: true,
          menuItems: [],
        },
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>',
          name: "รายงานปัญหา",
          url: "/member/report",
          activeDropdown: false,
          isDropdown: false,
          isActive: false,
          menuItems: [],
        },
      ],
    };
  },
};
</script>
