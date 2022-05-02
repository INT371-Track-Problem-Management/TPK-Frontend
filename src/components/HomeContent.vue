<template>
  <div class="container mx-auto px-5">
    <div class="grid grid-cols-2 content-center">
      <div class="font-black self-center mx-auto">
        <div class="text-7xl">RANGMOD</div>
        <div class="">Web Application (รังมด)</div>
        <div class="">สำหรับจัดการระบบรายงานปัญหาในหอพัก</div>

        <RouterLink 
          to="/repair_status"
          class="flex w-4/5 my-4 py-4 px-4 text-rangmod-dark-yellow bg-rangmod-light-yellow rounded-full shadow-xl transition-all hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div class="mx-4">ตรวจสอบสถานะแจ้งซ่อม</div>
        </RouterLink>

      </div>
      <div class="p-16">
        <img src="@/assets/images/RangmodLogo.webp">
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