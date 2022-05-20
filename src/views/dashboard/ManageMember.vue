<template>
  
  <div>
    <SearchPanel />
    <MemberList />
  </div>

</template>

<script>

import SearchPanel from "@/components/manage_member/SearchPanel.vue"
import MemberList from "@/components/manage_member/MemberList.vue"

export default {

  components: { SearchPanel, MemberList }

}
</script>

<style>

</style>