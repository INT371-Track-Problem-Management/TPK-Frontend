<template>
  <div class="font-primary">
    <NavMenu/>
    <slot class="xl:mx-auto xl:container xl:px-40"/>
  </div>
</template>

<script>

  import NavMenu from "@/components/NavMenu.vue";
  
  export default {
    name: 'default',
    components: { NavMenu },
  }
</script>
