<template>
  <div class="font-primary">
    
    <div class="bg-rangmod-light-pink w-full h-2/5 absolute -z-10 top-0">&nbsp;</div>

    <div class="flex flex-col space-y-4 my-10">

      <div class="flex flex-row mx-auto items-center">
        <RouterLink to="/">
          <img src="@/assets/images/RangmodLogoName.webp" class="w-48">
        </RouterLink>
      </div>

      <SelectRole />

    </div>
    
  </div>
</template>

<script>
import SelectRole from "@/components/register/SelectRole.vue";
export default {
    components: { SelectRole }
}
</script>

<style>

</style>