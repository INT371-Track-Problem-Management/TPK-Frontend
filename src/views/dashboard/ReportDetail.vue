<template>
  
  <div>
    <SearchPanel />
    <RequestDetail :code="$route.params.code" />
    
  </div>

</template>

<script>

import SearchPanel from "@/components/report/SearchPanel.vue"
import RequestDetail from "@/components/report/RequestDetail.vue"

export default {

  components: { SearchPanel, RequestDetail }

}
</script>

<style>

</style>