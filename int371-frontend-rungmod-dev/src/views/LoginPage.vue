<template>
  <div class="font-primary">
    
    <div class="bg-rangmod-light-pink w-full h-2/5 absolute -z-10 top-0">&nbsp;</div>

    <div class="flex flex-col space-y-4 my-10">

      <div class="flex flex-row mx-auto items-center">
        <RouterLink to="/">
          <img src="@/assets/images/RangmodLogoName.webp" class="w-48">
        </RouterLink>
      </div>

      <LoginForm />

    </div>
    
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"
export default {
    
    components: { LoginForm }
}
</script>

<style>

</style>