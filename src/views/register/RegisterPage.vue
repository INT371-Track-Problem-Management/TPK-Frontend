<template>
  <div class="font-primary">
    
    <div class="bg-rangmod-light-pink w-full h-2/5 absolute -z-10 top-0">&nbsp;</div>

    <div class="flex flex-col space-y-4 my-10">

      <div class="flex flex-row mx-auto items-center cursor-pointer">
        <RouterLink to="/">
          <img src="@/assets/images/LOGO-rangmod.png" class="w-48">
        </RouterLink>
      </div>

      <RegisterForm />


    </div>
    
  </div>
</template>

<script>
import RegisterForm from "@/components/register/RegisterForm.vue";
export default {
    components: { RegisterForm }
}
</script>

<style>

</style>