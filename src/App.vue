<template>

  <main>
    <AppLayout />
  </main>

</template>

<script>  

  import { RouterLink, RouterView } from 'vue-router'
  import AppLayout from '@/layouts/AppLayout.vue'

  export default ({
  name: 'App',
    components: {
      RouterView, AppLayout,
    }
  })

</script>

<style>

</style>