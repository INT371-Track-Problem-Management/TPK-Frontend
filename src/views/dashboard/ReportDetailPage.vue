<template>
  
  <div>
    <RequestDetail :code="$route.params.code" />
    
  </div>

</template>

<script>

import RequestDetail from "@/components/report/RequestDetail.vue"

export default {

  components: { RequestDetail }

}
</script>

<style>

</style>