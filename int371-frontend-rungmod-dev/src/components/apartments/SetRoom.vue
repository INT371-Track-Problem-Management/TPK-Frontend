<template>
  <div class="container mx-auto px-5">
    
    <div class="flex space-x-2 items-center my-5 text-rangmod-purple">

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>

      <div>
        อาพาร์ตเม้นต์
      </div>
    
    </div>

    <div class="w-1/2 mx-auto">
      
      <div class="text-xl my-5">ติดตั้งอพาร์ตเม้นต์</div>

      <div
        v-for="(floor, i) in floor_data"
        :key="i"
      >
        <div class="w-full bg-rangmod-light-pink text-lg p-4">
          ชั้นที่ {{floor.floor_number}}
        </div>

        <div class="px-4">
          <div class="my-2">เลขห้อง</div>
          <div 
            v-for="(room, j) in floor.room_number"
            :key="j"
            class="grid grid-cols-2 gap-10 mb-3"
          >
            <div class="">
              <div class="border border-rangmod-gray rounded-xl px-3">
                <input 
                  type="text" 
                  class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                  v-model="room[j]"
                >
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-rangmod-blue"></div>
              <div class="ml-3">เปิดใช้งาน</div>
            </div>
          </div>

          <div
            @click="addRoom(floor.floor_number)"
            class="w-full text-center cursor-pointer text-rangmod-purple my-20 py-2 border border-rangmod-purple rounded-xl transition-all hover:bg-rangmod-purple hover:text-white"
          >
            + เพิ่มห้อง
          </div>

        </div>
      </div>
    

      <div 
        @click="submitSetting" 
        class="flex justify-end cursor-pointer mt-24"
      >
        <div class="w-32 my-4 py-1 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
          ต่อไป
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      floor_data: [
        {
          floor_number: 1,
          room_number: [101, 102, 103, 104],
        },
        {
          floor_number: 2,
          room_number: [201, 202, 203, 204],
        },
        {
          floor_number: 3,
          room_number: [301, 302, 303, 304],
        },
      ]
    };
  },
  methods: {
    addRoom(floor_number) {
      console.log(floor_number);
    },
    submitSetting() {
      this.$router.push(`/apartments/`);
      },
    },
  }
</script>

<style>

</style>