<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ห้องพักของฉัน</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      class="w-full bg-white"
      :class="roomLists.length > 0 ? '' : 'py-48'"
    >
      <!-- <div
        v-show="buildingLists.length > 0"
        class="flex justify-start px-2 md:px-12"
      >
        <div
          @click="(showAddModal = !showAddModal), (modalBg = !modalBg)"
          class="cursor-pointer w-20 bg-rangmod-purple text-white border-2 border-rangmod-purple rounded-full text-center py-1 shadow-md transition-all hover:bg-transparent hover:text-rangmod-purple"
        >
          + เพิ่ม
        </div>
      </div> -->

      <div
        v-if="roomLists.length > 0"
        class="grid grid-cols-1 xse:grid-cols-2 sm:grid-cols-3 2xmd:grid-cols-4 lg:grid-cols-5 gap-5 my-5 px-0 py-2"
      >
        <div v-for="(room, i) in roomLists" :key="i">
          <transition name="bounce" appear>
            <RouterLink
            :to="{
              name: 'member-myroom-room-report',
              params: { id: room.roomId , roomNum: room.roomNum},
            }"
            >
            <div
              class="cursor-pointer w-full border rounded-3xl py-2 transition-all hover:font-bold hover:opacity-90 text-rangmod-purple hover:text-white hover:bg-rangmod-purple"
            >
              <div class="items-center my-5 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-door-closed w-36 h-36"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"
                  />
                  <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                </svg>
              </div>
              <div class="text-center my-2 text-base">
                {{ room.roomNum }}
              </div>
            </div>
            </RouterLink>
          </transition>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    roomNum: {
      type: String,
    },
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      modalBg: false,
      roomLists: [],
    };
  },
  computed: {},
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.roomLists = await this.getAllRoomByCustomerId();
    },
    async getAllRoomByCustomerId() {
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/customer/getAllRoomByCustomerId/`+parseInt(localStorage.getItem('id')),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    add() {
      for (let i in this.floorRooms) {
        for (let j = 1; j <= this.floorRooms[i].rooms; j++) {
          this.rooms.push({
            roomNum: `${this.buildingId}${this.floorRooms[i].floor}${this.pad(
              j
            )}`,
            description: "ห้องธรรมดา",
            floor: this.floorRooms[i].floor,
          });
        }
      }
      console.log(this.rooms);
    },
    goToRoom(roomId) {
      console.log(roomId)
      // this.$router.push('/member/myroom/room/'+roomId)
    },
    clearData() {
      this.addBuilding.name = "";
      this.addBuilding.floor = 1;
      this.floorRooms = [
        {
          floor: 1,
          rooms: 10,
        },
      ];
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

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
</style>
