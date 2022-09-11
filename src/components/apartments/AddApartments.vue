<template>
  <div class="font-primary text-rangmod-black container mx-auto px-5">
    <div class="flex space-x-2 items-center my-5 text-rangmod-purple">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>

      <div class="bg-white">อาพาร์ตเม้นต์</div>
    </div>

    <div class="w-full lg:w-1/2 mx-auto">
      <div class="text-xl my-5">ติดตั้งอพาร์ตเม้นต์</div>

      <div class="shadow-md">
        <div class="w-full bg-rangmod-light-pink text-lg px-4 py-3">ข้อมูล</div>

        <div class="bg-white px-4">
          <div class="grid grid-cols-2 gap-5 lg:gap-10 my-5">
            <div class="">
              <div class="my-2">ชื่ออพาร์ตเม้นต์</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input
                  v-model="dorm.dormName"
                  type="text"
                  class="px-3 w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                />
              </div>
            </div>

            <div class="">
              <div class="my-2">อีเมล</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input
                  v-model="dorm.email"
                  type="text"
                  class="px-3 w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5 lg:gap-10 my-5">
            <div class="">
              <div class="my-2">เบอร์ติดต่อ</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input
                  v-model="dorm.phone"
                  type="text"
                  class="px-3 w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                />
              </div>
            </div>

            <div class="">
              <div class="my-2">จำนวนชั้น</div>
              <div class="border border-rangmod-gray rounded-xl">
                <input
                  v-model="floorAmount"
                  type="number"
                  min="1"
                  class="px-3 w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                />
              </div>
            </div>
          </div>
          <div v-if="roomIsSet" class="flex justify-end">
            <div
              @click="setFloorRooms(this.floorAmount)"
              class="cursor-pointer w-52 my-4 py-1 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              กำหนดจำนวนห้องต่อชั้น
            </div>
          </div>

          <div v-if="!roomIsSet" class="w-full lg:w-2/3">
            <div class="my-2">จำนวนห้องต่อชั้น</div>
            <div v-for="(floor, i) in floors" :key="i">
              <div
                class="flex h-8 items-center border border-rangmod-gray rounded-xl my-4 overflow-hidden"
              >
                <div
                  class="w-60 sm:w-48 text-sm p-2 text-rangmod-black bg-stone-200 border-r border-rangmod-gray"
                >
                  จำนวนห้องชั้น {{floor.floor}}
                </div>
                <input
                  v-model="floor.roomAmount"
                  type="number" min="1"
                  class="w-full border-1 border-black text-rangmod-black text-lg outline-none leading-8 tracking-wide px-3"
                />
                <div
                  class="text-sm p-2 text-rangmod-black bg-stone-200 border-l border-rangmod-gray"
                >
                  ห้อง
                </div>
              </div>
            </div>
          </div>

          <div v-if="!roomIsSet" class="flex justify-end mt-24">
            <div
              @click="submitApartments"
              class="cursor-pointer w-32 my-4 py-1 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ต่อไป
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      empId: localStorage.getItem("id"),
      dorm: {
        dormName: "",
        phone: "",
        email: "",
      },
      floorAmount: 1,
      floors: [
        {
          floor: 1,
          roomAmount: 1,
        },
      ],
      roomIsSet: true,
    };
  },
  methods: {
    setFloorRooms(floorAmount) {
      // console.log(floorAmount)
      for(let i = 1; i < floorAmount; i++) {
        console.log(i);
        this.floors.push({
          floor: i+1,
          roomAmount: 1,
      })
      }
      console.log(this.floors)
      this.roomIsSet = !this.roomIsSet;
    },
    
    submitApartments() {
      this.$router.push(`/apartments/set_room`);
    },
  },
};
</script>

<style></style>
