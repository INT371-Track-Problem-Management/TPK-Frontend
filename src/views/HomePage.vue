<template>
  <div class="font-primary relative">

    <NavMenu />
    <HomeContent />
    
  </div>
</template>

<script>

import NavMenu from "@/components/NavMenu.vue"
import HomeContent from "@/components/HomeContent.vue";

export default {
  components: { NavMenu, HomeContent },
  
  data() {
      return {};
  },
}
</script>

<style>

</style>