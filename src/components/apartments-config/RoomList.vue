<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2 transition-all"
  >
    <div class="flex items-center">
      <div
        @click="this.$router.back()"
        class="cursor-pointer hover:font-bold mx-4"
      >
        {{ this.goback }}
      </div>
      <div class="text-xl">ห้องพักอาคาร</div>
    </div>
    <hr class="my-4 border-rangmod-purple" />
    <div v-for="(floor, i) in floorList" :key="i" class="mb-10">
      <div class="text-xl">ห้องพักชั้นที่ {{ i + 1 }}</div>
      <hr class="my-4 border-rangmod-light-gray" />

      <div>
        <div
          v-for="(rooms, j) in floor"
          :key="j"
          
        >
        <div class="flex flex-wrap justify-center xl:justify-start">
          <div
            v-for="(room, k) in rooms"
            :key="k"
            @click="showDetail(room.roomId,room.roomNum)"
          >
            <div
              class="text-center px-24 py-5 m-2 border border-rangmod-purple cursor-pointer transition-all hover:bg-rangmod-light-pink hover:font-bold"
            >
              <div class="pb-2">{{ room.roomNum }}</div>

              <div class="flex justify-center">
              <div
                v-for="(status, l) in statusList"
                :key="l"
              >
                <div 
                  v-if="room.status == status.id"
                  :class="[status.color, status.border_color]"
                  class="whitespace-nowrap border px-1 rounded-md"
                >
                  {{status.title}}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
          
        </div>
      </div>
    </div>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>

    <transition>
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20"
      >
        <div
          class="w-11/12 xl:w-1/3 h-2/3 xl:h-1/3 mx-auto my-44 xl:my-60 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div @click="showModal = false, this.customerModal = {}" class="cursor-pointer">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div v-if="customerModal.id != 0">
            <div class="text-2xl text-rangmod-purple mb-5">
              ห้อง {{ customerModal.roomNum }}
            </div>
            <div class="flex flex-col space-y-1 pb-8">
              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">รหัสผู้ใช้งาน :</div>
                <div>{{ customerModal.customerId }}</div>
              </div>

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">ชื่อ-นามสกุล :</div>
                <div>{{ customerModal.fname }} {{ customerModal.lname }}</div>
              </div>

              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">สถานะ :</div>
                <div v-for="(status, j) in statusList" :key="j">
                  <div v-if="customerModal.status == status.id" :class="status.color">
                    {{ status.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="text-2xl text-rangmod-purple mb-5">
              ห้อง {{ customerModal.roomNum }}
            </div>

            <div class="flex flex-col space-y-1 pb-8">
              <div class="flex flex-row space-x-2">
                <div class="text-rangmod-black">ไม่มีข้อมูลผู้พัก</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      showModal: false,
      customerModal: {},
      statusList: [
        {
          id: "A",
          color: "text-rangmod-green",
          border_color: "border-rangmod-green",
          title: "พักอาศัย",
        },
        {
          id: "I",
          color: "text-rangmod-yellow",
          border_color: "border-rangmod-yellow",
          title: "ว่าง",
        },
        {
          id: "O",
          color: "text-rangmod-red",
          border_color: "border-rangmod-red",
          title: "ย้ายออก",
        },
      ],
      roomWithCustomerList: [],
      floorList: [],
      goback: "<",
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getAllRoomByBuilding(this.$route.params.buildingId);
      await this.getRoomWithCustomerByBuildingId(this.$route.params.buildingId);
    },
    async getAllRoomByBuilding(buildingId) {
      const res = await fetch(
        "https://dev.rungmod.com/api/employee/roomByBuildingId/" + buildingId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (res.status == 500) {
        console.log(buildingId + " no room");
        return "noRoom";
      } else {
        const data = res.json();
        return data.then((data) => {
          for (let floor in data.floors) {
            this.floorList.push(data.floors[floor]);
          }
        });
      }
    },
    async getRoomWithCustomerByBuildingId(buildingId) {
      const res = await fetch(
        "https://dev.rungmod.com/api/employee/GetAllRoomWithCustomer/?buildingId=" + buildingId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json()
      return data.then((data) => {
        this.roomWithCustomerList = data
        console.log(data);
      })
    },
    showDetail(roomId,roomNum) {
      this.showModal = true;
      for(let customer in this.roomWithCustomerList) {
        if(this.roomWithCustomerList[customer].roomId == roomId) {
          this.customerModal = this.roomWithCustomerList[customer]
          break;
        } else {
          this.customerModal = {id: 0}
        }
      }
      this.customerModal.roomNum = roomNum
    },
  },
};
</script>

<style></style>
