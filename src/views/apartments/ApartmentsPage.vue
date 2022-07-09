<template>
  <div class="font-primary">
    
    <NavMenuUser />
    <ApartmentsList />
    
  </div>
</template>

<script>
import NavMenuUser from "@/components/NavMenuUser.vue"
import ApartmentsList from "@/components/apartments/ApartmentsList.vue"
export default {
    data() {
        return {};
    },
    components: { NavMenuUser, ApartmentsList }
}
</script>

<style>

</style>