<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ห้องพักของฉัน</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      v-if="!noInRoom"
      class="grid grid-cols-1 xse:grid-cols-2 sm:grid-cols-3 2xmd:grid-cols-4 lg:grid-cols-5 gap-5 my-5 px-0 py-2"
    >
      <div v-for="(room, i) in roomLists" :key="i">
        <transition name="bounce" appear>
          <RouterLink
            :to="{
              name: 'member-myroom-room-report',
              params: { id: room.roomId, roomNum: room.roomNum },
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
    <div v-if="loading" class="flex justify-center">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://lottie.host/005cb1c2-8212-403c-a9cb-37255a3a6552/pwMNUwBeCY.json"
        class="w-40 h-40"
      >
      </lottie-player>
    </div>
    <div v-if="noInRoom" class="mx-auto w-full">
      <div class="text-rangmod-black my-10 mx-auto w-fit">
        ไม่มีห้องที่พักอยู่
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
      noInRoom: false,
    };
  },
  computed: {
    // loading() {
    //   if (this.roomLists.length == 0) {
    //     return true;
    //   }
    //   return false;
    // },
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.roomLists = await this.getAllRoomByCustomerId();
      console.log(this.roomLists);
    },
    async getAllRoomByCustomerId() {
      try {
        this.loading = true
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/customer/getAllRoomByCustomerId/` +
            parseInt(localStorage.getItem("id")),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = res.json();
        return data.then((data) => {
          if (data == null) {
            this.loading = false
            this.noInRoom = true;
            console.log("not in any room");
          } else {
            this.loading = false
            return data;
          }
        });
      } catch (e) {
        console.log(e);
      }
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

/* .bounce-enter-active {
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
} */
</style>
