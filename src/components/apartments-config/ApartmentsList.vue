<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">หอพัก</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      class="w-full bg-white"
      :class="buildingLists.length > 0 ? '' : 'py-48'"
    >
      <div
        v-show="buildingLists.length > 0"
        class="flex justify-start px-2 md:px-12"
      >
        <div
          @click="(showAddModal = !showAddModal), (modalBg = !modalBg)"
          class="cursor-pointer w-20 bg-rangmod-purple text-white border-2 border-rangmod-purple rounded-full text-center py-1 shadow-md transition-all hover:bg-transparent hover:text-rangmod-purple"
        >
          + เพิ่ม
        </div>
      </div>

      <div
        v-if="buildingLists.length > 0"
        class="grid grid-cols-1 xse:grid-cols-2 sm:grid-cols-3 2xmd:grid-cols-4 lg:grid-cols-5 gap-5 my-5 px-0 py-2"
      >
        <div v-for="(building, i) in buildingLists" :key="i">
          <transition name="bounce" appear>
            <RouterLink
            :to="{
              name: 'dashboard-apartment-room',
              params: { buildingId: building.buildingId, buildingName: building.buildingName},
            }"
            >
            <div
              class="cursor-pointer w-full border rounded-3xl py-2 transition-all hover:font-bold hover:opacity-90 text-rangmod-purple hover:text-white hover:bg-rangmod-purple"
            >
              <div class="items-center my-5 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-36 w-36"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div class="text-center my-2 text-base">
                {{ building.buildingName }}
              </div>
            </div>
            </RouterLink>
          </transition>
        </div>
      </div>

      <div v-else class="w-1/2 mx-auto text-center justify-center">
        <div class="my-4">ยังไม่มีอาพาร์ตเม้นต์ในระบบ</div>
        <RouterLink to="/dashboard/config/apartment/add">
          <div
            class="w-20 mx-auto bg-rangmod-purple text-white border border-rangmod-purple rounded-full text-center py-1 shadow-md transition-all hover:bg-transparent hover:text-rangmod-purple"
          >
            + เพิ่ม
          </div>
        </RouterLink>
      </div>
    </div>
    <!-- Add --------------------------------------------------------------------------------------- -->

    <div
      :class="
        modalBg
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="modalBg = !modalBg"
    ></div>
    <transition name="bounce">
      <div
        v-show="showAddModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="overflow-auto no-scrollbar h-[600px] font-primary bg-white w-4/5 lg:w-1/2 mx-auto my-4 p-10 rounded-xl shadow-md"
        >
          <div class="flex justify-end">
            <div
              @click="(showAddModal = false), (modalBg = false), clearData()"
              class="cursor-pointer"
            >
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

          <div class="flex flex-row justify-between">
            <div class="text-rangmod-purple text-2xl">ติดตั้งหอพัก</div>
            <!-- <div class="text-rangmod-purple text-xl">1/2</div> -->
          </div>
          <hr class="my-4" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 my-5">
            <div class="">
              <div class="my-2">ชื่ออาคาร</div>
              <div class="border border-rangmod-gray rounded-xl px-3">
                <input
                  v-model="addBuilding.name"
                  type="text"
                  class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                />
              </div>
            </div>

            <div class="">
              <div class="my-2">จำนวนชั้น</div>
              <div class="flex flex-row">
                <div class="border border-rangmod-gray rounded-xl px-3">
                  <input
                    v-model="addBuilding.floor"
                    type="number"
                    min="1"
                    class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide"
                  />
                </div>
                <div class="flex flex-row space-x-2 mx-2 text-rangmod-gray">
                  <div
                    @click="delFloor()"
                    class="cursor-pointer items-center my-auto transition-all hover:text-rangmod-purple"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-dash-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                      />
                    </svg>
                  </div>
                  <div
                    @click="addFloor()"
                    class="cursor-pointer items-center my-auto transition-all hover:text-rangmod-purple"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-2/3">
            <div class="my-2">จำนวนห้องต่อชั้น</div>
            <div v-for="(floor, i) in floorRooms" :key="i">
              <div
                class="flex h-8 items-center border border-rangmod-gray rounded-xl my-4 overflow-hidden"
              >
                <div
                  class="w-60 sm:w-48 text-sm p-2 text-rangmod-black bg-stone-200 border-r border-rangmod-gray"
                >
                  จำนวนห้องชั้น {{ floor.floor }}
                </div>
                <input
                  v-model="floor.rooms"
                  type="number"
                  min="0"
                  class="w-full border-1 border-black text-rangmod-black text-lg rounded-xl outline-none leading-8 tracking-wide px-3"
                />
                <div
                  class="text-sm p-2 text-rangmod-black bg-stone-200 border-l border-rangmod-gray"
                >
                  ห้อง
                </div>
              </div>
            </div>
          </div>

          <div class="my-5 flex justify-end">
            <div
              @click="insertBuildingAndRoom()"
              class="cursor-pointer w-fit py-2 px-5 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ต่อไป
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    building: {
      type: Number,
    },
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      modalBg: false,
      showAddModal: false,
      addBuilding: {
        name: "",
        floor: 1,
      },
      buildingLists: [],
      floorRooms: [
        {
          floor: 1,
          rooms: 10,
        },
      ],
      rooms: [],
      // buildingId: 1,
      // allBuilding: [],
    };
  },
  computed: {},
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.buildingLists = await this.getBuildings();
      console.log(this.buildingLists);
    },
    async getBuildings() {
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/allBuilding`,
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
          return data.AllBuilding
        })
      } catch (e) {
        console.log(e);
      }
    },
    async insertBuildingAndRoom() {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/employee/building`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          buildingName: this.addBuilding.name,
          createBy: parseInt(localStorage.getItem("id")),
        }),
      });
      const data = res.json();
      return data.then(async (res) => {
        if (res.message == "Insert success") {
          await this.insertRooms(res.BuildingId);
        }
      });
    },
    async insertRooms(buildingId) { //////////////////////////////
      this.add(buildingId)
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/employee/rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            BuildingId: buildingId,
            Rooms: this.rooms,
            UpdateBy: parseInt(localStorage.getItem("id")),
          }),
        });
        const data = res.json();
        console.log(data);
        return data.then(async(res) => {
          console.log(res);
          if(res.message == "success") {
            alert('เพิ่มหอพักสำเร็จ!!')
          } else {
            alert('การเพิ่มหอพักผิดพลาด')
          }
        })
      } catch (e) {
        console.log(e);
      }
    },
    add(buildingId) {
      for (let i in this.floorRooms) {
        for (let j = 1; j <= this.floorRooms[i].rooms; j++) {
          this.rooms.push({
            RoomNum: `${buildingId}${this.floorRooms[i].floor}${this.pad(
              j
            )}`,
            Description: "ห้องธรรมดา",
            Floors: this.floorRooms[i].floor,
          });
        }
      }
      console.log(this.rooms);
    },
    addFloor() {
      this.addBuilding.floor++;
      this.floorRooms.push({
        floor: this.floorRooms.length + 1,
        rooms: 0,
      });
    },
    delFloor() {
      if (this.floorRooms.length == 1) {
        console.log("ไม่สามารถลดจำนวนชั้นหอพักได้แล้ว");
      } else {
        this.addBuilding.floor--;
        this.floorRooms.pop();
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
