<template>
  <div class="font-primary container mx-auto px-5">
    <div class="grid grid-cols-1 md:grid-cols-2 content-center pb-20">
      
      <div class="md:hidden w-8/12 mx-auto mb-8">
        <img src="@/assets/images/RangmodLogo.webp">
      </div>

      <div class="flex flex-col font-black self-center items-center md:items-start mx-auto">
        
        <div class="mb-2 w-3/4"><img src="@/assets/images/logo.png"></div>
        <div class="mb-2 text-md md:text-lg">Web Application (รังมด)</div>
        <div class="mb-2 text-md md:text-lg">สำหรับจัดการระบบรายงานปัญหาในหอพัก</div>

        <RouterLink 
          to="/repair_status"
          class="flex w-fit my-4 py-4 px-4 text-rangmod-dark-yellow bg-rangmod-light-yellow rounded-full shadow-xl transition-all cursor-pointer hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div class="mx-4">ตรวจสอบสถานะแจ้งซ่อม</div>
        </RouterLink>

      </div>
      
      <div class="hidden md:flex p-16">
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>