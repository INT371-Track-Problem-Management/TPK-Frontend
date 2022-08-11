<template>
  <div class="font-primary">
    <NavMenuApartment/>
    <slot class="xl:mx-auto xl:container xl:px-40"/>
  </div>
</template>

<script>

  import NavMenuApartment from "@/components/NavMenuApartment.vue";
  
  export default {
    name: 'AppLayoutDefault',
    components: { NavMenuApartment },
  }
</script>
