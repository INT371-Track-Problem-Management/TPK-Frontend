<template>

  <div>
    <div class="bg-rangmod-light-pink w-full h-[32rem] absolute -z-10 top-0">&nbsp;</div>
    <div class="container mx-auto px-5">
      <div class="flex flex-row justify-between py-6">
        <RouterLink to="/" class="text-3xl ">
          RANGMOD
        </RouterLink>

        <div class="flex flex-row space-x-12 content-center">
          <RouterLink 
            to="/"
            class="tracking-wider px-5 py-1 transition-all hover:bg-rangmod-purple hover:rounded-full hover:text-white hover:scale-105"
          >
            บทความ
          </RouterLink>

          <RouterLink 
            to="/login"
            class="tracking-wider px-5 py-1 transition-all hover:bg-rangmod-purple hover:rounded-full hover:text-white hover:scale-105"
          >
            เข้าสู่ระบบ
          </RouterLink>

          <RouterLink 
            to="/register"
            class="tracking-wider bg-rangmod-purple text-white rounded-full px-5 py-1 shadow-xl transition-all hover:shadow-none hover:scale-105"
          >
            สมัครสมาชิก
          </RouterLink>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style>

</style>