<template>
  
  <div>
    <NavMenuUser />

    <div class="grid grid-cols-12 gap-8 pr-8">
      <SideMenu class="col-span-2" />

      <div class="col-span-10">
        <SearchPanel />
        <MemberList />
      </div>

    </div>

  </div>

</template>

<script>

import NavMenuUser from "@/components/NavMenuUser.vue"
import SideMenu from "@/components/SideMenu.vue"
import SearchPanel from "@/components/manage_member/SearchPanel.vue"
import MemberList from "@/components/manage_member/MemberList.vue"

export default {

  components: { NavMenuUser, SideMenu, SearchPanel, MemberList }

}
</script>

<style>

</style>