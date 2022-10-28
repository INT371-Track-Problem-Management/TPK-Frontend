<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลการรายงานปัญหา</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="flex flex-col lg:flex-row justify-between items-center">
      <div
        class="flex flex-wrap lg:flex-row justify-center lg:justify-start items-center"
      >
        <!-- <div 
          v-for="(status, i) in statusList"
          :key="i"
          :class="status.bgcolor"
          @click="doFilter(status.id)"
          class="w-28 mr-2 mb-4 py-3 text-center rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90"

        >
          <div
            :class="status.color"
          >{{status.title}}</div>
        </div> -->
        <!-- <div 
          @click="doFilter('')"
          class="w-36 mr-2 mb-4 py-3 text-center rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90 bg-rangmod-black/20"
        >
          <div
            class="text-rangmod-black"
          >ทั้งหมด</div>
        </div> -->
      </div>

      <div
        @click="activeSortFilter = !activeSortFilter"
        class="w-full lg:w-auto justify-end flex flex-row space-x-2 items-center cursor-pointer relative py-4 lg:py-0"
      >
        <div>จัดเรียงตาม</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div v-if="activeSortFilter" class="absolute top-10 right-0 z-10">
          <div
            class="w-48 mx-auto p-3 text-center bg-white shadow-lg rounded-xl"
          >
            <div
              v-for="(sort, i) in sortList"
              :key="i"
              @click="doSort(sort.key)"
              class="w-full py-2 rounded-xl transition-all hover:bg-rangmod-light-pink"
            >
              {{ sort.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10 hidden md:table">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">ห้อง</th>
        <th class="py-4">รหัสรายงาน</th>
        <th class="py-4">หัวข้อปัญหา</th>
        <th class="py-4">ว/ด/ป แจ้งซ่อม</th>
        <th class="py-4">ว/ด/ป นัดซ่อม</th>
        <th class="py-4">สถานะ</th>
        <th class="py-4"></th>
      </tr>

      <tr
        v-for="(request, i) in requestList"
        :key="i"
        class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-2 px-2">{{ i + 1 }}</td>
        <td class="text-center py-2 px-2">{{request.roomNum}}</td>
        <td class="text-center py-2 px-2">{{ request.reportId }}</td>
        <td class="text-center py-2 px-2">{{ request.title }}</td>
        <td class="text-center py-2">{{ dateShowFormat(request.createdAt) }}</td>
        <td class="text-center py-2">{{ request.selectedDate == '' ? '-' : engageDateShowFormat(request.selectedDate) }}</td>
        <td class="text-center py-2">
          <div v-for="(status, j) in statusList" :key="j">
            <div
              v-if="this.checkThaiStatus(request.status) == status.name"
              :class="status.color"
            >
              {{ this.checkThaiStatus(request.status) }}
            </div>
          </div>
        </td>
        <td
          class="text-center py-2 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
        >
          <RouterLink
            :to="{
              name: 'dashboard-report-detail',
              params: { id: request.reportId },
            }"
            >รายละเอียด</RouterLink
          >
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(request, i) in requestList"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <!-- <div class="flex flex-row justify-between">
          <div>ห้อง</div>
          <div>{{request.room}}</div>
        </div> -->
        <div class="flex flex-row justify-between">
          <div>รหัสรายงาน</div>
          <div>{{ request.id }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>หัวข้อปัญหา</div>
          <div>{{ request.title }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป แจ้งซ่อม</div>
          <div>{{ request.request_date }}</div>
        </div>

        <div v-for="(repair, j) in request.repair_date" :key="j">
          <div v-if="repair.isActive" class="flex flex-row justify-between">
            <div>ว/ด/ป นัดซ่อม</div>
            <div>{{ repair.date }}</div>
          </div>
        </div>

        <!-- <div
          v-for="(status, j) in requestStatusList"
          :key="j"
        >
          <div 
            v-if="request.status == status.id"
            class="flex flex-row justify-between"
          >
            <div>สถานะ</div>
            <div :class="status.color">{{status.title}}</div>
          </div>
        </div> -->

        <RouterLink :to="`/dashboard/report/${request.reportId}`">
          <div
            class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          >
            รายละเอียด
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      createdBy: 0,
      activeSortFilter: false,

      sortList: [
        { key: "id", name: "รหัสรายงาน" },
        { key: "room", name: "ห้อง" },
        { key: "request_date", name: "ว/ด/ป แจ้งซ่อม" },
      ],

      statusList: [
        {
          id: 1,
          eng: "waiting",
          name: "รอรับเรื่อง",
          color: "text-rangmod-blue",
          bgcolor: "bg-rangmod-blue/20",
        },
        {
          id: 2,
          eng: "accept",
          name: "รับเรื่อง",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: 3,
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: 4,
          eng: "prepare",
          name: "รอดำเนินการ",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: 5,
          eng: "postpone",
          name: "เลื่อนนัด",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
        },
        {
          id: 6,
          eng: "cancel",
          name: "ยกเลิกนัด",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
        },
        {
          id: 7,
          eng: "success",
          name: "เสร็จสิ้น",
          color: "text-rangmod-green",
          bgcolor: "bg-rangmod-green/20",
        },
        {
          id: 8,
          eng: "defer",
          name: "รอยืนยันเลื่อนนัด",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
        },
        {
          id: 9,
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
        },
      ],

      // requestList: [
      //   {
      //     id: "ED123456",
      //     room: "201",
      //     title: "น้ำไม่ไหล",
      //     desc: "น้ำไม่ไหล DESC ",
      //     status: "3",
      //     request_date: "29/03/2565",
      //     repair_date: [
      //       {
      //         date: "31/03/2565",
      //         isActive: true,
      //         remark: "เหตุผลครั้งที่ 1"
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //     ],
      //   },
      //   {
      //     id: "ED654321",
      //     room: "102",
      //     title: "ไฟไม่ติด",
      //     desc: "ไฟไม่ติด DESC ",
      //     status: "2",
      //     request_date: "29/03/2565",
      //     repair_date: [
      //       {
      //         date: "31/03/2565",
      //         isActive: true,
      //         remark: "เหตุผลครั้งที่ 1"
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //     ],
      //   },
      //   {
      //     id: "ED789101",
      //     room: "203",
      //     title: "น้ำรั่ว",
      //     desc: "น้ำรั่ว DESC ",
      //     status: "5",
      //     request_date: "29/03/2565",
      //     repair_date: [
      //       {
      //         date: "31/03/2565",
      //         isActive: true,
      //         remark: "เหตุผลครั้งที่ 1"
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //     ],
      //   },
      //   {
      //     id: "ED786123",
      //     room: "203",
      //     title: "ปลวกขึ้น",
      //     desc: "ปลวกขึ้น DESC ",
      //     status: "4",
      //     request_date: "29/03/2565",
      //     repair_date: [
      //       {
      //         date: "31/03/2565",
      //         isActive: true,
      //         remark: "เหตุผลครั้งที่ 1"
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //     ],
      //   },
      //   {
      //     id: "ED543210",
      //     room: "201",
      //     title: "โต๊ะพัง",
      //     desc: "โต๊ะพัง DESC ",
      //     status: "1",
      //     request_date: "29/03/2565",
      //     repair_date: [
      //       {
      //         date: "31/03/2565",
      //         isActive: true,
      //         remark: "เหตุผลครั้งที่ 1"
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //       {
      //         date: "",
      //         isActive: false,
      //         remark: ""
      //       },
      //     ],
      //   },

      // ]
      requestList: [],
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.token = localStorage.getItem("token");
      this.createdBy = parseInt(localStorage.getItem("id"));
      this.requestList = await this.getAllRequest();
      this.requestList.sort(function (a, b) {
        return a.reportId - b.reportId;
      });
    },
    checkThaiStatus(status) {
      for(let i in this.statusList) {
        if(status.toLowerCase() == this.statusList[i].eng) {
          return this.statusList[i].name
        }
      }
    },
    async getAllRequest() {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/employee/report`, {
        method: "GET",
        headers: { "content-Type": "application/json",Authorization: `Bearer ${this.token}` },
      });
      const data = res.json();
      return data;
    },
    dateShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return formatedDate;
    },
    engageDateShowFormat(engage) {
      const res = engage.split('T')
      const dateRes = res[0].split('-')
      const showDate = dateRes[2]+'/'+dateRes[1]+'/'+(parseInt(dateRes[0])+543)
      // const showTime = res[1].split('Z')
      return showDate
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
  },
};
</script>

<style></style>
