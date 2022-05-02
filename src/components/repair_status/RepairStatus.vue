<template>
  <div class="mx-10 p-5">

    <div class="text-xl">รายละเอียดและสถานะ</div>
    <hr class="my-5">

    <div class="flex">
      <div class="text-xl">ตรวจสอบสถานะแจ้งซ่อม</div>
      <div class="border border-rangmod-gray rounded-lg mx-4">
        <input type="text" class="rounded-lg outline-none px-2">
      </div>
    </div>

    <div class="w-2/3 mx-auto my-10">

      <!-- status update -->
      <div class="flex flex-row justify-center">

        <div 
          v-for="(status, i) in statusList"
          :key="i"
          class="flex items-center"
        >
          <div 
            class="w-24 h-24 mx-auto  rounded-full relative"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          >
            <div class="absolute w-fit -bottom-8 left-1/2 -translate-x-1/2">{{status.name}}</div>
          </div>
          <div
            v-show="status.divider" 
            class="w-20 h-3"
            :class="status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray' "
          ></div>
        </div>

      </div>

    </div>

  </div> 
  
</template>

<script>
export default {

  data() {
    return {

      statusList: [
        {
          name: "รอรับเรื่อง",
          divider: true,
          isActive: true,
        },
        {
          name: "รับเรื่อง",
          divider: true,
          isActive: true,
        },
        {
          name: "เลื่อนนัด",
          divider: true,
          isActive: false,
        },
        {
          name: "รอเข้าซ่อม",
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
      ]

    }
  }
}
</script>

<style>

</style>