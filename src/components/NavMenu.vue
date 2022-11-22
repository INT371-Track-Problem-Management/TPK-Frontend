<template>
  <div>
    <div class="bg-rangmod-light-pink w-full h-[32rem] absolute -z-10 top-0">
      &nbsp;
    </div>

    <div class="w-full px-10">
      <div
        class="flex flex-col xse:flex-row justify-center xse:justify-between py-6 xse:space-y-0 space-y-5"
      >
        <RouterLink to="/" class="mx-0 items-center">
          <img src="@/assets/images/LOGO-rangmod.png" class="h-fit w-32 mx-auto">
        </RouterLink>

        <div
          class="flex flex-row lg:space-x-5 justify-center mx-0 py-0 text-base"
        >
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
export default {};
</script>

<style></style>
