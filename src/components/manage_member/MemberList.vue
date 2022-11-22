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
        <th class="py-4">รหัส</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <th class="py-4">ว/ด/ป ลงทะเบียน</th>
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
          {{ splitDate(member.createAt) }}
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="getDetail(member.customerId)"
        >
          <div>รายละเอียด</div>
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(member, i) in filteredMember"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between font-bold">
          <div>{{ i + 1 }}</div>
        </div>
        <hr class="my-2 border-rangmod-gray" />
        <div class="flex flex-row justify-between">
          <div>รหัส</div>
          <div>{{ member.customerId }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ชื่อ</div>
          <div>{{ member.fname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>นามสกุล</div>
          <div>{{ member.lname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป ลงทะเบียน</div>
          <div>{{ splitDate(member.createAt) }}</div>
        </div>

        <div
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="getDetail(member.customerId)"
        >
          <div>รายละเอียด</div>
        </div>
      </div>
    </div>

    <div
      v-if="modalbg"
      class="bg-black fixed inset-0 opacity-60 visible z-[80]"
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
            <div
              @click="(showDetailModal = false), (modalbg = false)"
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

          <div class="text-2xl text-rangmod-purple mb-5">
            ประวัติผู้พักอาศัย
          </div>

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
            <div class="text-rangmod-black ml-1">ที่อยู่</div>
            <div class="border-rangmod-gray rounded-xl -pb-4">
              <textarea
                readonly
                v-model="detailModal.address"
                class="bg-rangmod-light-gray px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              ></textarea>
            </div>
          </div>

          <div class="mb-4 flex flex-row space-x-2">
            <div class="text-rangmod-black">
              <div class="text-rangmod-black ml-1">สถานะ</div>

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

    <transition name="bounce">
      <div
        v-show="showAdd"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || assignedCustomer"
          class="bg-black fixed inset-0 opacity-60 visible z-[100]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div
              @click="(showAdd = false), (modalbg = false), clearData()"
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

          <div class="text-2xl text-rangmod-purple mb-5">
            ทำประวัติผู้พักอาศัย
          </div>

          <div class="mb-8">
            <div class="text-rangmod-black ml-1">รหัสผู้ใช้งาน</div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                @keyup.enter="search()"
                type="number"
                v-model="searchId"
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
            <div class="text-rangmod-black ml-1">ชื่อ</div>
            <div
              class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
            >
              <div v-if="!searchCustomer.fname">&nbsp;</div>
              {{ searchCustomer.fname }}
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black ml-1">นามสกุล</div>
            <div
              class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
            >
              <div v-if="!searchCustomer.lname">&nbsp;</div>
              {{ searchCustomer.lname }}
            </div>
          </div>

          <div class="mb-4 flex flex-row space-x-2">
            <div class="text-rangmod-black w-full">
              <div class="text-rangmod-black ml-1">วันเกิด</div>
              <div
                class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
              >
                <div v-if="!searchCustomer.dateOfBirth">&nbsp;</div>
                {{ searchCustomer.dateOfBirth }}
              </div>
            </div>

            <div class="text-rangmod-black w-full">
              <div class="text-rangmod-black ml-1">อายุ</div>
              <div
                class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
              >
                <div v-if="!searchCustomer.age && searchCustomer.age != 0">
                  &nbsp;
                </div>
                {{ searchCustomer.age }}
              </div>
            </div>
          </div>

          <div class="mb-4 flex flex-row space-x-2">
            <div class="text-rangmod-black w-full">
              <div class="text-rangmod-black ml-1">เพศ</div>
              <div
                class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
              >
                <div v-if="!searchCustomer.sex">&nbsp;</div>
                {{ searchCustomer.sex }}
              </div>
            </div>
            <div class="text-rangmod-black w-full">
              <div class="text-rangmod-black ml-1">เบอร์มือถือ</div>
              <div
                class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
              >
                <div v-if="!searchCustomer.phone">&nbsp;</div>
                {{ searchCustomer.phone }}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black ml-1">ที่อยู่</div>
            <textarea
              readonly
              v-model="searchCustomer.address"
              class="bg-rangmod-light-gray px-3 w-full border border-rangmod-gray text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            ></textarea>
          </div>

          <div class="mb-4 flex flex-row space-x-2">
            <div class="text-rangmod-black w-full">
              <div class="flex flex-row">
                <div class="text-rangmod-black ml-1">ห้องพัก</div>
                <div v-if="roomUnavailable" class="text-rangmod-red px-1">
                  * ห้องไม่ว่าง
                </div>
              </div>
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="number"
                  v-model="addModal.room"
                  class="border border-rangmod-gray px-3 w-full text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black w-full">
              <div class="text-rangmod-black ml-1">สถานะ</div>
              <div
                class="border border-rangmod-gray rounded-xl bg-rangmod-light-gray px-3 w-full text-rangmod-black outline-none leading-10 tracking-wider"
              >
                <div v-if="!searchCustomer.status">&nbsp;</div>
                {{ searchCustomer.status }}
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
        <div
          v-if="loading"
          class="fixed w-full h-full inset-0 flex items-center justify-center z-[120]"
        >
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/005cb1c2-8212-403c-a9cb-37255a3a6552/pwMNUwBeCY.json"
            class="w-40 h-40"
          >
          </lottie-player>
        </div>
        <div
          v-if="assignedCustomer"
          class="fixed w-full h-full inset-0 flex items-center justify-center z-[120]"
        >
          <div class="text-rangmod-green items-center bg-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="loadingData" class="flex justify-center">
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
      modalbg: false,
      showAdd: false,
      roomUnavailable: false,
      assignedCustomer: false,
      loadingData: false,
      loading: false,
      detailModal: {},
      addModal: {},
      searchId: "",
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
  computed: {},
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.loadingData = true;
      this.memberList = await this.getCustomers();
      this.filteredMember = this.memberList;
      if (this.filteredMember.length > 0) {
        this.loadingData = false;
      }
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
        return res.customers;
      });
    },
    async getCustomerById(customerId) {
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/customerById/${customerId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        const data = res.json();
        return data.then((res) => {
          return res.customer;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getDetail(customerId) {
      this.modalbg = true;
      const detail = await this.getCustomerById(customerId);
      this.detailModal = detail;
      this.detailModal.dateOfBirth = this.splitDate(detail.dateOfBirth);
      this.detailModal.sex = detail.sex == "M" ? "ชาย" : "หญิง";
      this.detailModal.status = detail.status == "I" ? "รอเข้าพัก" : "พักอาศัย";
      this.showDetailModal = true;
    },
    async search() {
      console.log(!this.searchCustomer.age);
      this.searchCustomer = await this.getCustomerById(this.searchId);
      this.searchCustomer.sex = this.searchCustomer.sex == "M" ? "ชาย" : "หญิง";
      this.searchCustomer.status =
        this.searchCustomer.status == "I" ? "รอเข้าพัก" : "พักอาศัย";
      this.searchCustomer.dateOfBirth = this.splitDate(
        this.searchCustomer.dateOfBirth
      );
    },
    add() {
      this.showAdd = true;
      this.modalbg = true;
    },
    clearData() {
      this.searchCustomer = {};
      this.detailModal = {};
      this.addModal = {};
    },
    async addCustomerToRoom(roomNum) {
      this.loading = true;
      this.modalbg = false;
      const room = await this.searchRoomByRoomNum(roomNum);
      if (room != "fail") {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/addEmployeeInBuilding`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              roomId: room.roomId,
              customerId: this.searchCustomer.customerId,
              buildingId: room.buildingId,
              updateBy: parseInt(this.empId),
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          if (data.message == "success") {
            this.loading = false;
            this.assignedCustomer = true;
            setTimeout(() => {
              this.assignedCustomer = false;
            }, 2000);
            setTimeout(() => {
              this.showAdd = false;
              this.clearData();
              this.searchId = "";
            }, 2500);
          } else {
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
        this.roomUnavailable = true;
      }
    },
    async searchRoomByRoomNum(roomNum) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/service/room/roomNum/${roomNum}`,
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
        console.log(data);
        if (data.roomId != 0 && data.status == "I") {
          return data;
        } else {
          return "fail";
        }
      });
    },
    splitDate(datetime) {
      if (datetime == "") {
        return "-";
      }
      const res = datetime.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
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
