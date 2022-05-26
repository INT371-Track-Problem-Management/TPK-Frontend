<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลผู้พัก</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="w-32 my-10 cursor-pointer" @click="add()">
      <div
        class="flex flex-row justify-start items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
      >
        <div>สร้างประวัติ</div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10 hidden md:table">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">รหัสสมาชิก</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <th class="py-4">ว/ด/ป ลงทะเบียน</th>
        <th class="py-4">ห้อง</th>
        <th class="py-4"></th>
        <th class="py-4"></th>
      </tr>
      <tr
        v-for="(member, i) in memberList"
        :key="i"
        class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4 whitespace-nowrap">{{ i + 1 }}</td>
        <td class="text-center py-4 whitespace-nowrap">{{ member.code }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ member.fname }} {{ member.lname }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">{{ member.date }}</td>
        <td class="text-center py-4 whitespace-nowrap">{{ member.room }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          <div v-for="(status, j) in statusList" :key="j">
            <div v-if="member.status == status.id" :class="status.color">
              {{ status.title }}
            </div>
          </div>
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="showDetail(member.code)"
        >
          <div>รายละเอียด</div>
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
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
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/2 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showModal = false" class="cursor-pointer">
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
                type="text"
                v-model="modal.code"
                class="w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />

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
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ชื่อ</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="modal.fname"
                class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">นามสกุล</div>
            <div class="border-rangmod-gray rounded-xl">
              <input
                type="text"
                readonly
                v-model="modal.lname"
                class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
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
                  v-model="modal.dateOfBirth"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              อายุ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="modal.age"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
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
                  v-model="modal.sex"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              เบอร์มือถือ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="modal.phone"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ที่อยู่</div>
            <div class="border-rangmod-gray rounded-xl -pb-4">
              <textarea
                readonly
                v-model="modal.address"
                class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              ></textarea>
            </div>
          </div>

          <div class="mb-4 grid grid-cols-2 gap-2">
            <div class="text-rangmod-black px-1">
              ห้องพัก
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="modal.room"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              สถานะ
              <div class="border-rangmod-gray rounded-xl">
                <input
                  type="text"
                  readonly
                  v-model="modal.status"
                  class="bg-rangmod-gray/40 px-3 w-full border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="showModal = !showModal"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
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
      showModal: false,
      modal: {
        code: "00000",
        name: "name",
        surname: "surname",
        date: "XX/XX/XXXX",
        age: "24",
        gender: "หญิง",
        tel: "0809876543",
        address: "Address B",
        room: "102",
        status: "2",
      },
      roomList: [],
      dormList: [],
      reportList: [],
      statusList: [
        {
          id: "1",
          color: "text-rangmod-green",
          title: "พักอาศัย",
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          title: "รอเข้าพัก",
        },
        {
          id: "3",
          color: "text-rangmod-red",
          title: "ย้ายออก",
        },
      ],

      memberList: [
        // {
        //   code: "00123",
        //   name: "ธนวินท์",
        //   surname: "วัตราเศรษฐ์",
        //   date: "29/03/2565",
        //   age: "24",
        //   gender: "ชาย",
        //   tel: "0809876543",
        //   address: "Address A",
        //   room: "201",
        //   status: "1",
        // },
        // {
        //   code: "00122",
        //   name: "นพศร",
        //   surname: "เตชะรุ่งเรืองวิทย์",
        //   date: "29/03/2565",
        //   age: "24",
        //   gender: "หญิง",
        //   tel: "0809876543",
        //   address: "Address B",
        //   room: "102",
        //   status: "2",
        // },
        // {
        //   code: "00121",
        //   name: "อาทฤต",
        //   surname: "วิจิตรพันธ์ไม้",
        //   date: "29/03/2565",
        //   age: "24",
        //   gender: "ชาย",
        //   tel: "0809876543",
        //   address: "Address C",
        //   room: "203",
        //   status: "3",
        // },
        //     {
        //     customerId: "",
        //     email: "",
        //     fname: "",
        //     lname: "",
        //     sex: "",
        //     dateOfBirth: "",
        //     age: 0,
        //     phone: "",
        //     address: "",
        //     status: "",
        //     username: ""
        // }
      ],
      // username: "",
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.memberList = await this.getMembers();
      this.roomList = await this.getRooms();
      this.dormList = await this.getDorm();
      this.reportList = await this.getReport();
      console.log(this.memberList);
      console.log(this.roomList);
      console.log(this.dormList);
      console.log(this.reportList);
      // this.username = localStorage.username;
      // console.log(this.username);
    },
    async getMembers() {
      try {
        const res = await fetch("https://dev.rungmod.com/api/customer");
        // const res = await fetch("http://localhost:5000/api/customer");
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    showDetail(member_code) {
      // console.log(`Show ${member_code} !`)

      this.showModal = true;
      let memberList = this.memberList;

      for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].code == member_code) {
          this.modal.code = memberList[i].code;
          this.modal.name = memberList[i].name;
          this.modal.surname = memberList[i].surname;
          this.modal.date = memberList[i].date;
          this.modal.age = memberList[i].age;
          this.modal.gender = memberList[i].gender;
          this.modal.tel = memberList[i].tel;
          this.modal.address = memberList[i].address;
          this.modal.room = memberList[i].room;
          this.modal.status = memberList[i].status;
        }
      }
    },
    add() {
      console.log("add");
    },
    async getRooms() {
      try {
        const res = await fetch("https://dev.rungmod.com/api/rooms");
        // const res = await fetch("http://localhost:5000/api/rooms");
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getDorm() {
      try {
        const res = await fetch("https://dev.rungmod.com/api/dorm");
        // const res = await fetch("http://localhost:5000/api/dorm");
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getReport() {
      try {
        const res = await fetch("https://dev.rungmod.com/api/report");
        // const res = await fetch("http://localhost:5000/api/report");
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    // async getReportById() {
    //   try {
    //     const res = await fetch("https://dev.rungmod.com/api/reportById");
    //     // const res = await fetch("http://localhost:5000/api/customer");
    //     const data = res.json();
    //     return data;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
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
</style>
