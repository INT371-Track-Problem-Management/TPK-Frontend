<template>
  
  <div>
    <SearchPanel />
    <RequestList />
  </div>

</template>

<script>

import SearchPanel from "@/components/report/SearchPanel.vue"
import RequestList from "@/components/report/RequestList.vue"

export default {

  components: { SearchPanel, RequestList }

}
</script>

<style>

</style>