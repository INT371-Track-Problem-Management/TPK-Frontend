<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายงานปัญหา</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="flex flex-row justify-end items-center">
      <!-- <div class="flex flex-row space-x-2 items-center mb-4">
        <div
          @click="showModal = !showModal"
          class="px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90 bg-rangmod-light-yellow"
        >
          <div class="text-rangmod-dark-yellow text-lg">แจ้งปัญหา</div>
        </div>
      </div> -->

      <div
        @click="activeSortFilter = !activeSortFilter"
        class="flex flex-row space-x-2 items-center cursor-pointer relative"
      >
        <div>เรียงจาก</div>
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
              class="w-full text-lg py-2 rounded-xl transition-all hover:bg-rangmod-light-pink"
            >
              {{ sort.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10">
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
        v-for="(report, i) in reportList"
        :key="i"
        class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4">{{ i + 1 }}</td>
        <td class="text-center py-4">{{report.roomNum}}</td>
        <td class="text-center py-4">{{ report.reportId }}</td>
        <td class="text-center py-4 truncate max-w-[120px]">{{ report.reportDes }}</td>
        <td class="text-center py-4">{{ dateShowFormat(report.createdAt) }}</td>
        <td class="text-center py-4">{{ splitDate(report.fixDate) }}
        </td>
        <td class="text-center py-4">
          <div v-for="(status, j) in statusList" :key="j">
            <div
              v-if="this.checkThaiStatus(report.status) == status.name"
              :class="status.color"
            >
              {{ this.checkThaiStatus(report.status) }}
            </div>
          </div>
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
        >
          <RouterLink
            :to="{
              name: 'member-report-detail',
              params: { id: report.reportId },
            }"
            >รายละเอียด</RouterLink
          >
        </td>
      </tr>
    </table>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      token: "",
      // report -------------------
      title: "",
      category: "",
      description: "",
      status: "S1",
      createdBy: localStorage.getItem("id"),
      isActivateCategory: false,
      categoryLists: [
        // {
        //   id: 0,
        //   name: "เลือกประเภทปัญหา",
        //   engName: "",
        // },
        {
          id: 1,
          name: "ไฟฟ้า",
          engName: "electric",
        },
        {
          id: 2,
          name: "น้ำ",
          engName: "water",
        },
        {
          id: 3,
          name: "อุปกรณ์ไฟฟ้า",
          engName: "electric device",
        },
        {
          id: 4,
          name: "อุปกรณ์เกี่ยวกับน้ำ",
          engName: "water machine",
        },
        {
          id: 5,
          name: "เฟอร์นิเจอร์",
          engName: "furniture",
        },
        {
          id: 6,
          name: "อาคารชำรุด",
          engName: "building",
        },
        {
          id: 7,
          name: "อื่น ๆ",
          engName: "other",
        },
      ],
      engage: {
        // formatedDate1: this.engageDates[0].date + " " + this.engageDates[0].time,
        // formatedDate2: this.engageDates[1].date + " " + this.engageDates[1].time,
        // formatedDate3: this.engageDates[2].date + " " + this.engageDates[2].time,
        // formatedDate4: this.engageDates[3].date + " " + this.engageDates[3].time,
        reportId: 0,
      },
      customers: [],
      engageDates: [
        {
          date: "2022-05-25",
          time: "08:02:27",
          dateTime: "",
          // isActive: false,
        },
        {
          date: "2022-07-26",
          time: "09:04:27",
          dateTime: "",
          // isActive: true,
        },
        {
          date: "2022-09-27",
          time: "10:06:27",
          dateTime: "",
          // isActive: false,
        },
        {
          date: "2022-11-28",
          time: "11:08:27",
          dateTime: "",
          // isActive: false,
        },
      ],

      activeSortFilter: false,
      // modal: {
      //   code: "00000",
      //   name: "name",
      //   surname: "surname",
      //   date: "XX/XX/XXXX",
      //   age: "24",
      //   gender: "หญิง",
      //   tel: "0809876543",
      //   address: "Address B",
      //   room: "102",
      //   status: "2",
      // },

      sortList: [
        { key: "id", name: "รหัสรายงาน" },
        { key: "room", name: "ห้อง" },
        { key: "request_date", name: "ว/ด/ป แจ้งซ่อม" },
      ],
      statusList: [
        {
          id: "S1",
          eng: "waiting",
          name: "รอรับเรื่อง",
          color: "text-rangmod-blue",
          bgcolor: "bg-rangmod-blue/20",
        },
        {
          id: "S2",
          eng: "accept",
          name: "รับเรื่อง",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: "S3",
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: "S4",
          eng: "prepare",
          name: "รอดำเนินการ",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
        },
        {
          id: "S5",
          eng: "postpone",
          name: "เลื่อนนัด",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
        },
        {
          id: "S6",
          eng: "cancel",
          name: "ยกเลิกนัด",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
        },
        {
          id: "S7",
          eng: "success",
          name: "เสร็จสิ้น",
          color: "text-rangmod-green",
          bgcolor: "bg-rangmod-green/20",
        },
        {
          id: "S8",
          eng: "defer",
          name: "รอยืนยันเลื่อนนัด",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
        },
        {
          id: "S9",
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
        },
      ],
      requestList: [
        // {
        //   id: "ED123456",
        //   room: "201",
        //   title: "น้ำไม่ไหล",
        //   desc: "น้ำไม่ไหล DESC ",
        //   status: "1",
        //   request_date: "29/03/2565",
        //   repair_date: [
        //     {
        //       date: "31/03/2565",
        //       isActive: true,
        //       remark: "เหตุผลครั้งที่ 1",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //   ],
        // },
        // {
        //   id: "ED654321",
        //   room: "102",
        //   title: "ไฟไม่ติด",
        //   desc: "ไฟไม่ติด DESC ",
        //   status: "1",
        //   request_date: "29/03/2565",
        //   repair_date: [
        //     {
        //       date: "31/03/2565",
        //       isActive: true,
        //       remark: "เหตุผลครั้งที่ 1",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //   ],
        // },
        // {
        //   id: "ED789101",
        //   room: "203",
        //   title: "น้ำรั่ว",
        //   desc: "น้ำรั่ว DESC ",
        //   status: "1",
        //   request_date: "29/03/2565",
        //   repair_date: [
        //     {
        //       date: "31/03/2565",
        //       isActive: true,
        //       remark: "เหตุผลครั้งที่ 1",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //   ],
        // },
        // {
        //   id: "ED786123",
        //   room: "203",
        //   title: "ปลวกขึ้น",
        //   desc: "ปลวกขึ้น DESC ",
        //   status: "1",
        //   request_date: "29/03/2565",
        //   repair_date: [
        //     {
        //       date: "31/03/2565",
        //       isActive: true,
        //       remark: "เหตุผลครั้งที่ 1",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //   ],
        // },
        // {
        //   id: "ED543210",
        //   room: "201",
        //   title: "โต๊ะพัง",
        //   desc: "โต๊ะพัง DESC ",
        //   status: "1",
        //   request_date: "29/03/2565",
        //   repair_date: [
        //     {
        //       date: "31/03/2565",
        //       isActive: true,
        //       remark: "เหตุผลครั้งที่ 1",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //     {
        //       date: "",
        //       isActive: false,
        //       remark: "",
        //     },
        //   ],
        // },
      ],
      reportList: [],
      validate: {
        title: false,
        description: false,
      },
    };
  },
  computed: {},
  mounted() {
    this.create();
  },
  methods: {
    validation() {
      this.title == ""
        ? (this.validate.title = true)
        : (this.validate.title = false);
      this.description == ""
        ? (this.validate.description = true)
        : (this.validate.description = false);
      return this.validate.title && this.validate.description;
    },
    async create() {
      this.token = localStorage.getItem("token");
      this.createdBy = parseInt(localStorage.getItem("id"));
      // console.log(this.createdBy);
      this.reportList = await this.getReport();
      // console.log(this.reportList);
    },
    doFilter(id) {
      console.log(`Filtered by ${id} !`);
    },
    doSort(id) {
      console.log(`Sorted by ${id} !`);
    },
    showDetail(reportId) {
      console.log(reportId);
    },
    async getReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reports`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },

        }
      );
      const data = res.json();
      console.log(data);
      return data;
    },
    clearData() {
      this.title = "";
      this.description = "";
      this.category = "";
    },
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    checkThaiStatus(status) {
      console.log(status);
      for(let i in this.statusList) {
        if(status == this.statusList[i].id) {
          return this.statusList[i].name
        }
      }
    },
    splitDate(datetime) {
      if (datetime == "") {
        return "";
      }
      const res = datetime.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
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
      return showDate
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
  },
};
</script>

<style>
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
