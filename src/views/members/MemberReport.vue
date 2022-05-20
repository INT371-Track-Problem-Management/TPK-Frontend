<template>
  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2">

    <div class="text-xl">รายละเอียดและสถานะ</div>
    <hr class="my-5">

    <!-- <div class="flex flex-col md:flex-row">
      <div class="text-xl">ตรวจสอบสถานะแจ้งซ่อม</div>
      <div class="border border-rangmod-gray rounded-lg mx-0 md:mx-4">
        <input type="text" class="rounded-lg outline-none px-2">
      </div>
    </div> -->

    <div class="w-full mx-auto my-20">

      <!-- status update -->
      <div class="flex flex-row justify-center">

        <div 
          v-for="(status, i) in statusList"
          :key="i"
          class="hidden lg:flex items-center "
        >
          <div 
            class="w-16 lg:w-20 xl:w-24 h-16 lg:h-20 xl:h-24 mx-auto rounded-full relative"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          >
            <div class="absolute w-max -bottom-8 left-1/2 -translate-x-1/2">{{status.name}}</div>
          </div>
          <div
            v-show="status.divider" 
            class="w-20 h-3"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          ></div>
        </div>

      </div>

    </div>

    <ReportForm />

    
/
  </div> 
  
</template>

<script>

import ReportForm from "@/components/report/ReportForm.vue";

export default {

  components: { ReportForm },

  data() {
    return {

      statusList: [
        {
          name: "รอรับเรื่อง",
          divider: true,
          isActive: true,
        },
        {
          name: "รอดำเนินการ",
          divider: true,
          isActive: true,
        },
        {
          name: "ดำเนินการแล้ว",
          divider: true,
          isActive: false,
        },
        {
          name: "เลื่อนนัด",
          divider: true,
          isActive: false,
        },
        {
          name: "ยกเลิกนัด",
          divider: true,
          isActive: false,
        },
        {
          name: "เสร็จสิ้น",
          divider: false,
          isActive: false,
        },
      ],

    }
  }
}
</script>

<style>

</style>