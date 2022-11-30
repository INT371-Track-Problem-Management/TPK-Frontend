<template>
  
  <div>
    <ReportDetail :code="$route.params.code" />
    
  </div>

</template>

<script>

import ReportDetail from "@/components/member/ReportDetail.vue"

export default {

  components: { ReportDetail }

}
</script>

<style>

</style>