<template>
  <div class="font-primary relative">
    <div class="bg-rangmod-light-pink w-full h-16 absolute -z-10 top-0">&nbsp;</div>

    <NavMenuUser />
    <AddApartments />
    
  </div>
</template>

<script>
import NavMenuUser from "@/components/NavMenuUser.vue"
import AddApartments from "@/components/apartments/AddApartments.vue"
export default {

    data() {
        return {};
    },
    components: { NavMenuUser, AddApartments }
}
</script>

<style>

</style>