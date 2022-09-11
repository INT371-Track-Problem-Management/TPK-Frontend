<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายงานปัญหา</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row space-x-2 items-center mb-4">
        <!-- <router-link to="/member/report"> -->
        <div
          @click="showModal = !showModal"
          class="px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90 bg-rangmod-light-yellow"
        >
          <div class="text-rangmod-dark-yellow text-lg">แจ้งปัญหา</div>
        </div>
      </div>

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
        <!-- <th class="py-4">ห้อง</th> -->
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
        <!-- <td class="text-center py-4">{{request.room}}</td> -->
        <td class="text-center py-4">{{ report.reportId }}</td>
        <td class="text-center py-4">{{ report.title }}</td>
        <td class="text-center py-4">{{ dateFormat(report.reportDate) }}</td>
        <td class="text-center py-4">
          <!-- {{ dateFormat(report.reportDate) }} -->
          <!-- <div v-for="(repair, j) in requreportest.repair_date" :key="j">
            <div v-if="repair.isActive">{{ repair.date }}</div>
          </div> -->
        </td>
        <td class="text-center py-4">
          <div
            v-for="(status, j) in statusList"
            :key="j"
          >
            <div 
              v-if="this.checkThaiStatus(report.status) == status.title"
              :class="status.color"
            >
              {{this.checkThaiStatus(report.status)}}
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

    <transition>
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showModal = false, validate.title = false, validate.description = false, clearData()" class="cursor-pointer">
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
            รายละเอียดแจ้งซ่อม
          </div>
          <div class="text-rangmod-black">หัวข้อปัญหา</div>
          <div class="mb-5">
            <input
              v-model="title"
              type="text"
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              :class="this.validate.title ? 'placeholder-red-500 border-red-500 border-2' : ''"
              :placeholder="this.validate.title ? 'กรุณาใส่หัวข้อปัญหา' : ''"
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              :class="this.validate.description ? 'placeholder-red-500 border-red-500 border-2' : ''"
              :placeholder="this.validate.description ? 'กรุณาใส่รายละเอียดปัญหา' : ''"
            ></textarea>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="sendReport()"
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
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      token: "",
      title: "",
      category: "test", //mockup dont del
      description: "",
      status: "S1",
      createdBy: 0,
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

      showModal: false,
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
          id: "1",
          color: "text-rangmod-blue",
          bgcolor: "bg-rangmod-blue/20",
          title: "รอรับเรื่อง"
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
          title: "รอดำเนินการ"
        },
        {
          id: "3",
          color: "text-rangmod-green",
          bgcolor: "bg-rangmod-green/20",
          title: "เสร็จสิ้น"
        },
        {
          id: "4",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
          title: "เลื่อนนัด"
        },
        {
          id: "5",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
          title: "ยกเลิก"
        },
        {
          id: "6",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
          title: "นัดวันเข้าซ่อม"
        },
        {
          id: "7",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
          title: "รับเรื่อง"
        },
        {
          id: "8",
          color: "text-rangmod-black",
          bgcolor: "bg-rangmod-black/20",
          title: "ทั้งหมด"
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
      }
    };
  },
  computed: {

  },
  mounted() {   
    this.create();

  },
  methods: {
    validation() {
      this.title == "" ? this.validate.title = true : this.validate.title = false
      this.description == "" ? this.validate.description = true : this.validate.description = false
      return this.validate.title && this.validate.description
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
    sendReport() {
      if (!this.validation()) {
        fetch(`https://dev.rungmod.com/api/customer/report`, {
          method: "POST",
          headers: { "content-Type": "application/json",
                    "Authorization" : `Bearer ${this.token}` },
          body: JSON.stringify({
            Title: this.title,
            CategoriesReport: this.category,
            ReportDes: this.description,
            Status: this.status,
            CreatedBy: this.createdBy,
          }),
        })
          .then(() => {
            alert("Send report!");
            this.showModal = !this.showModal;
            this.clearData()
          })
          .then(async () => {
            this.reportList = await this.getReport();
            console.log(this.reportList)
          });
      } 
    },
    async getReport() {
      const res = await fetch(`https://dev.rungmod.com/api/customer/reportByCreatedBy`, {
        method: "POST",
        headers: { "content-Type": "application/json",
                    "Authorization" : `Bearer ${this.token}` },
        body: JSON.stringify({
          CreatedBy: this.createdBy
        }),
      })
        const data = res.json();
        return data;
    },
    clearData() {
      this.title = ""
      this.description = ""
    },
    dateFormat(inputDate) {
      // console.log(inputDate)
      const date = new Date(inputDate);
      // console.log(date.getDate())
      // console.log(date.getMonth())
      // console.log(date.getFullYear())
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    checkThaiStatus(status) {
      if(status.toLowerCase() == 'waiting') {
        return 'รอรับเรื่อง';
      }
      if(status.toLowerCase() == 'accept') {
        return 'รับเรื่อง';
      }
      if(status.toLowerCase() == 'engage') {
        return 'นัดวันเข้าซ่อม';
      }
      if(status.toLowerCase() == 'prepare') {
        return 'รอดำเนินการ';
      }
      if(status.toLowerCase() == 'postpone') {
        return 'เลื่อนนัด';
      }
      if(status.toLowerCase() == 'cancel') {
        return 'ยกเลิก';
      }
      if(status.toLowerCase() == 'success') {
        return 'เสร็จสิ้น'
      }
    },
    // async getCustomers() {
    //   try {
    //     const res = await fetch("https://dev.rungmod.com/api/customer");
    //     const data = res.json();
    //     return data;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
};
</script>

<style></style>
