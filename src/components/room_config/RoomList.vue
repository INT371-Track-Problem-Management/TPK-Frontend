<template>
  <div class="font-primary text-rangmod-black">

    <div class="w-full xl:w-4/5 mx-auto">
      
      <div class="text-xl my-5">ผังห้อง</div>

      <div
        v-for="(room, i) in roomList"
        :key="i"
      >
        <div class="w-full bg-rangmod-light-pink text-lg p-4">
          ชั้นที่ {{room.floor_number}}
        </div>

        <div class="px-4">
          <div class="my-2">เลขห้อง</div>
          <div 
            v-for="(item, j) in room.roomItems"
            :key="j"
            class="grid grid-cols-2 gap-10 mb-3"
          >
            <div class="">
              <div class="border border-rangmod-gray rounded-xl px-3">
                <input 
                  type="text" 
                  class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-8 tracking-wide"
                  v-model="item.room_number"
                >
              </div>
            </div>

            <div
              @click="item.isActive = !item.isActive"
              class="cursor-pointer"
            >
              <div v-if="item.isActive" class="flex items-center">
                <div class="w-4 h-4 bg-rangmod-blue"></div>
                <div class="ml-3">เปิดใช้งาน</div>
              </div>

              <div v-else class="flex items-center">
                <div class="w-4 h-4 bg-rangmod-red"></div>
                <div class="ml-3">ปิดใช้งาน</div>
              </div>
            </div>

          </div>

          <div
            @click="addRoom(room.floor_number)"
            class="w-full text-center cursor-pointer text-rangmod-purple my-10 py-2 border border-rangmod-purple rounded-xl transition-all hover:bg-rangmod-purple hover:text-white"
          >
            + เพิ่มห้อง
          </div>

        </div>

        
      </div>

      <div
        @click="addFloor()"
        class="w-full text-center cursor-pointer text-rangmod-dark-yellow bg-rangmod-yellow my-10 py-2 border border-rangmod-yellow rounded-xl transition-all hover:bg-white hover:text-rangmod-yellow"
      >
        + เพิ่มชั้น
      </div>
      
      <div 
        class="flex justify-end mt-10 mb-20"
      >
        <div class="w-32 my-4 py-1 cursor-pointer text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
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
      roomList: [
        {
          floor_number: 1,
          roomItems: [
            { room_number: "101", status: "3", isActive: true, },
            { room_number: "102", status: "1", isActive: true, },
            { room_number: "103", status: "3", isActive: true, },
            { room_number: "104", status: "3", isActive: true, },
          ],
        },
        {
          floor_number: 2,
          roomItems: [
            { room_number: "201", status: "1", isActive: true, },
            { room_number: "202", status: "3", isActive: true, },
            { room_number: "203", status: "1", isActive: true, },
            { room_number: "204", status: "3", isActive: true, },
          ],
        },
        {
          floor_number: 3,
          roomItems: [
            { room_number: "301", status: "3", isActive: false, },
            { room_number: "302", status: "2", isActive: true, },
            { room_number: "303", status: "3", isActive: false, },
            { room_number: "304", status: "2", isActive: true, },
          ],
        },
      ]
    };
  },
  methods: {
    addRoom(room_number) {
      console.log(`Add Room of Floor ${room_number} !`);
    },
    addFloor(){
      console.log(`Add Floor !`);
    },
  },
}
</script>

<style>

</style>