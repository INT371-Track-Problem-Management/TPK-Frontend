<template>
  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2">
  
    <div class="text-xl">ติดตั้งหอพัก</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="w-full lg:w-2/3 mx-auto">

      <div class="text-xl my-5">ติดตั้งอพาร์ตเม้นต์</div>

      <div class="w-full bg-rangmod-light-pink text-lg p-4">
        ข้อมูล
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 my-5">

        <div class="">
          <div class="my-2">ชื่อหอพัก</div>
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input type="text" class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide">
            
          </div>
        </div>

        <div class="">
          <div class="my-2">จำนวนชั้น</div>
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input type="text" class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide">
          </div>
        </div>

      </div>

      <div class="w-full lg:w-2/3">
        <div class="my-2">จำนวนห้องต่อชั้น</div>

        <div class="flex h-8 items-center border border-rangmod-gray rounded-xl my-4 overflow-hidden">
          <div class="w-60 sm:w-48 text-sm p-2 text-rangmod-black bg-stone-200 border-r border-rangmod-gray">จำนวนห้องชั้น 1</div>
          <input type="text" class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide px-3 ">
          <div class="text-sm p-2 text-rangmod-black bg-stone-200 border-l border-rangmod-gray">ห้อง</div>
       </div>

        <div class="flex h-8 items-center border border-rangmod-gray rounded-xl my-4 overflow-hidden">
          <div class="w-60 sm:w-48 text-sm p-2 text-rangmod-black bg-stone-200 border-r border-rangmod-gray">จำนวนห้องชั้น 2</div>
          <input type="text" class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide px-3 ">
          <div class="text-sm p-2 text-rangmod-black bg-stone-200 border-l border-rangmod-gray">ห้อง</div>
        </div>

      </div>

      <div class="flex justify-end mt-24" >
        <div 
          @click="submitApartments" 
          class="cursor-pointer w-32 my-4 py-1 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
        >
          ต่อไป
        </div>
      </div>

    </div>

  </div> 
</template>

<script>
export default {

  methods: {
    submitApartments() {
      this.$router.push(`/dashboard/config/apartment/set_room`);
    }
  },

}
</script>

<style>

</style>