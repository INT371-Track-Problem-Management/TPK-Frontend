<template>
  <SearchPanel />
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลผู้พัก</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="w-32 my-5 cursor-pointer" @click="add()">
      <div
        class="items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
      >
        <div class="flex justify-center">สร้างประวัติ</div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10 hidden md:table">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">รหัสสมาชิก</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <th class="py-4">ว/ด/ป ลงทะเบียน</th>
        <!-- <th class="py-4">ห้อง</th> -->
        <th class="py-4">สถานะ</th>
        <th class="py-4"></th>
      </tr>
      <tr
        v-for="(member, i) in filteredMember"
        :key="i"
        class="border-b border-rangmod-light-gray transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4 whitespace-nowrap">{{ i + 1 }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ member.customerId }}
        </td>
        <td class="text-center py-4 whitespace-nowrap truncate max-w-[100px]">
          {{ member.fname }} {{ member.lname }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ this.dateFormat(member.createAt) }}
        </td>
        <!-- <td class="text-center py-4 whitespace-nowrap">
          <div v-for="(status, j) in statusList" :key="j">
            <div v-if="member.status == status.name" :class="status.color">
              {{ status.title }}
            </div>
          </div>
        </td> -->
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="getDetail(member.customerId)"
        >
          <div>รายละเอียด</div>
        </td>
      </tr>
    </table>

    <!-- <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(member, i) in memberList"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between">
          <div>รหัสสมาชิก</div>
          <div>{{ member.code }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ชื่อ-นามสกุล</div>
          <div>{{ member.fname }} {{ member.lname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป ลงทะเบียน</div>
          <div>{{ member.date }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ห้อง</div>
          <div>{{ member.room }}</div>
        </div>

        <div v-for="(status, j) in statusList" :key="j">
          <div
            v-if="member.status == status.id"
            class="flex flex-row justify-between"
          >
            <div>สถานะ</div>
            <div :class="status.color">{{ status.title }}</div>
          </div>
        </div>

        <div
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="showDetail(member.code)"
        >
          <div>รายละเอียด</div>
        </div>
      </div>
    </div> -->

    <div
      :class="
        showDetailModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showDetailModal = !showDetailModal"
    ></div>

    <transition name="bounce">
      <div
        v-show="showDetailModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showDetailModal = false" class="cursor-pointer">
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

          <div class="text-2xl text-rangmod-purple mb-5">
            ประวัติผู้พักอาศัย
          </div>

          <!-- <div class="mb-8">
            <div class="text-rangmod-black px-1">รหัสผู้ใช้งาน</div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">

              <div
                class="absolute right-4 top-2 text-rangmod-purple cursor-pointer"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div> -->

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ชื่อ</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="detailModal.fname"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">นามสกุล</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="detailModal.lname"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              ว/ด/ป/เกิด
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.dateOfBirth"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              อายุ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.age"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              เพศ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.sex"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              เบอร์มือถือ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.phone"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ที่อยู่</div>
            <div class="border-rangmod-gray rounded-xl -pb-4">
              <textarea
                readonly
                v-model="detailModal.address"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              ></textarea>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <!-- <div class="text-rangmod-black px-1">
              ห้องพัก
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.room"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div> -->

            <div class="text-rangmod-black px-1">
              สถานะ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="detailModal.status"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="showDetailModal = !showDetailModal"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- Add --------------------------------------------------------------------------------------- -->
    <div
      :class="
        showAdd
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showAdd = !showAdd"
    ></div>

    <transition name="bounce">
      <div
        v-show="showAdd"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="(showAdd = false), clearData()" class="cursor-pointer">
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

          <div class="text-2xl text-rangmod-purple mb-5">
            ทำประวัติผู้พักอาศัย
          </div>

          <div class="mb-8">
            <div class="text-rangmod-black px-1">รหัสผู้ใช้งาน</div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                type="number"
                min="1"
                v-model="addModal.customerId"
                class="w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />

              <div
                @click="search()"
                class="absolute right-4 top-2 text-rangmod-purple cursor-pointer"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ชื่อ</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="addModal.fname"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">นามสกุล</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="addModal.lname"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              ว/ด/ป/เกิด
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="addModal.dateOfBirth"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              อายุ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="addModal.age"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              เพศ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="addModal.sex"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              เบอร์มือถือ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="addModal.phone"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ที่อยู่</div>
            <div class="border-rangmod-gray rounded-xl -pb-4">
              <textarea
                readonly
                v-model="addModal.address"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              ></textarea>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              ห้องพัก
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="number"
                  min="1"
                  v-model="addModal.room"
                  class="border border-rangmod-gray px-3 w-full text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              สถานะ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="addModal.status"
                  class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="addCustomerToRoom(addModal.room)"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="assignedCustomer"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 my-auto"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            เพิ่มผู้พักอาศัยเข้าห้องพักสำเร็จ
          </div>
        </div>
      </div>
    </transition>

    <div  v-if="loading" class="flex justify-center">
      <lottie-player
      autoplay
      loop
      mode="normal"
      src="https://lottie.host/005cb1c2-8212-403c-a9cb-37255a3a6552/pwMNUwBeCY.json"
      class="w-40 h-40"
    >
    </lottie-player>
    </div>
    
  </div>
</template>

<script>
import SearchPanel from "@/components/manage_member/SearchPanel.vue";
export default {
  components: { SearchPanel },
  data() {
    return {
      token: localStorage.getItem("token"),
      empId: localStorage.getItem("id"),
      showDetailModal: false,
      showAdd: false,
      assignedCustomer: false,
      detailModal: {
        customerId: 1,
        fname: "",
        lname: "",
        dateOfBirth: "",
        age: 1,
        sex: "",
        phone: "",
        address: "",
        // room: 1,
        status: "",
      },
      addModal: {
        customerId: 1,
        fname: "",
        lname: "",
        dateOfBirth: "",
        age: 1,
        sex: "",
        phone: "",
        address: "",
        room: 1,
        status: "",
      },
      searchCustomer: {},
      statusList: [
        {
          name: "A",
          color: "text-rangmod-green",
          title: "พักอาศัย",
        },
        {
          name: "I",
          color: "text-rangmod-yellow",
          title: "รอเข้าพัก",
        },
      ],
      memberList: [],
      filteredMember: [],
    };
  },
  computed: {
    loading() {
      if(this.memberList.length == 0 || this.filteredMember.length == 0) {
        return true
      }
      return false
    }
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.memberList = await this.getCustomers();
      this.filteredMember = this.memberList;
      console.log(this.memberList);
    },
    async getCustomers() {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/listCustomer`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        const data = res.json();
        return data.then((res) => {
          return res.customers
        })
    },
    async getCustomerById(customerId) {
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/customerById/?customerId=${customerId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getDetail(customerId) {
      const detail = await this.getCustomerById(customerId);
      this.detailModal.customerId = detail.customerId;
      this.detailModal.fname = detail.fname;
      this.detailModal.lname = detail.lname;
      this.detailModal.age = detail.age;
      this.detailModal.dateOfBirth = this.dateFormat(detail.dateOfBirth);
      this.detailModal.sex = detail.sex == "M" ? "ชาย" : "หญิง";
      this.detailModal.phone = detail.phone;
      this.detailModal.address = detail.address;
      this.detailModal.status = detail.status == "I" ? "รอเข้าพัก" : "พักอาศัย";
      this.showDetailModal = true;
    },
    async search() {
      this.searchCustomer = await this.getCustomerById(
        this.addModal.customerId
      );
      if (!this.searchCustomer) {
        alert("ไม่มีลูกค้าคนนี้");
      } else {
        this.addModal.customerId = this.searchCustomer.customerId;
        this.addModal.fname = this.searchCustomer.fname;
        this.addModal.lname = this.searchCustomer.lname;
        this.addModal.dateOfBirth = this.dateFormat(
          this.searchCustomer.dateOfBirth
        );
        this.addModal.age = this.searchCustomer.age;
        this.addModal.sex = this.searchCustomer.sex == "M" ? "ชาย" : "หญิง";
        this.addModal.phone = this.searchCustomer.phone;
        this.addModal.address = this.searchCustomer.address;
        // this.addModal.room = this.searchCustomer.room;
        this.addModal.status =
          this.searchCustomer.status == "I" ? "รอเข้าพัก" : "พักอาศัย";
        console.log(this.searchCustomer);
      }
    },
    add() {
      this.showAdd = true;
      console.log("add");
    },
    clearData() {
      this.addModal.customerId = 1;
      this.addModal.fname = "";
      this.addModal.lname = "";
      this.addModal.dateOfBirth = "";
      this.addModal.age = 1;
      this.addModal.sex = "";
      this.addModal.phone = "";
      this.addModal.address = "";
      this.addModal.room = 1;
      this.addModal.status = "";
    },
    async addCustomerToRoom(roomNum) {
      const room = await this.searchRoomByRoomNum(roomNum);
      if (room != "fail") {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/roomAddCustomer`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              RoomId: room.roomId,
              CustomerId: this.addModal.customerId,
              BuildingId: room.buildingId,
              UpdateBy: parseInt(this.empId),
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          if (data == "success") {
            this.assignedCustomer = true;
            setTimeout(() => {
              this.assignedCustomer = false;
            }, 2000);
            setTimeout(() => {
              this.showAdd = false;
            }, 2500);
          } else {
            alert("fail");
          }
        });
      } else {
        alert("no room");
      }
    },
    async searchRoomByRoomNum(roomNum) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/roomByRoomNum/?roomNum=${roomNum}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.roomId != 0) {
          return data;
        } else {
          return "fail";
        }
      });
    },
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    spiltBuilding(room) {
      const res = room.toString().split("");
      res.pop();
      res.pop();
      res.pop();
      const res2 = res[0] + res[1];
      return parseInt(res2);
    },
    searchCustomerList(searchItem) {
      this.filteredMember = this.memberList;
      console.log(searchItem);
      // if(searchItem.fname == '' || searchItem.lname == '') {
      //   console.log();
      // }

      this.filteredMember = this.filteredMember.filter((member) => {
        return member.customerId
          .toString()
          .includes(searchItem.customerId.toString());
      });
      this.filteredMember = this.filteredMember.filter((member) => {
        return member.fname.includes(searchItem.fname);
      });
      this.filteredMember = this.filteredMember.filter((member) => {
        return member.lname.includes(searchItem.lname);
      });
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
