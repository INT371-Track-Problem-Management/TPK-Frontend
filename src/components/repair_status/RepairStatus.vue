<template>
  <div class="w-10/12 mx-auto font-primary bg-white rounded-xl shadow-md p-5 mb-10">

    <div class="text-xl">รายละเอียดและสถานะ</div>
    <hr class="my-5 border-rangmod-purple">

    <div class="flex flex-col md:flex-row">
      <div class="text-xl">ตรวจสอบสถานะแจ้งซ่อม</div>
      <div class="border border-rangmod-gray rounded-lg mx-0 md:mx-4">
        <input type="text" class="rounded-lg outline-none px-2">
      </div>
    </div>

    <div class="w-full mx-auto my-12">

      <!-- status update -->
      <div class="hidden lg:flex flex-row justify-center">

        <div 
          v-for="(status, i) in statusList"
          :key="i"
          class="flex items-center"
        >
          <div 
            class="w-16 lg:w-20 xl:w-24 h-16 lg:h-20 xl:h-24 mx-auto rounded-full relative z-10"
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

      <!-- status update mobile -->
      <div class="w-full md:w-2/5 mx-auto lg:hidden flex flex-col justify-start">
        <div 
          v-for="(status, i) in statusList"
          :key="i"
          class="flex flex-row items-center space-x-6 pb-8 -mb-1 relative"
        >
          <div 
            class="w-16 h-16 rounded-full"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          >
          </div>
          <div class="text-base md:text-lg">{{status.name}}</div>

          <div
            v-show="status.divider" 
            class="w-2 h-20 absolute left-1 bottom-1 z-20"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          ></div>

        </div>
      </div>

    </div>

    <RepairForm />

  </div> 
  
</template>

<script>

import RepairForm from "@/components/repair_status/RepairForm.vue";

export default {

  components: { RepairForm },

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