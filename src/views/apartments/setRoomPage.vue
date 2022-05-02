<template>
  <div class="font-primary relative">
    <div class="bg-rangmod-light-pink w-full h-16 absolute -z-10 top-0">&nbsp;</div>

    <NavMenuUser />
    <SetRoom />
    
  </div>
</template>

<script>
import NavMenuUser from "../../components/NavMenuUser.vue"
import SetRoom from "../../components/apartments/SetRoom.vue"
export default {
    
    components: { NavMenuUser, SetRoom }
}
</script>

<style>

</style>