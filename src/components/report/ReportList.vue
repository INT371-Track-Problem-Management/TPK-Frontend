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
          {{ dateFormat(report.reportDate) }}
          <!-- <div v-for="(repair, j) in requreportest.repair_date" :key="j">
            <div v-if="repair.isActive">{{ repair.date }}</div>
          </div> -->
        </td>
        <td class="text-center py-4">
          <div v-for="(status, i) in statusList" :key="i">
            <div v-if="report.status == status.status" :class="status.color">
              {{ report.status }}
            </div>
          </div>
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
        >
          <RouterLink :to="{name: 'member-report-detail',  params: {id: report.reportId}}">รายละเอียด</RouterLink>
        </td>
      </tr>
    </table>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-80'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>

    <transition>
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-90 inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
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
            รายละเอียดแจ้งซ่อม
          </div>
          <div class="text-rangmod-black">หัวข้อปัญหา</div>
          <div class="mb-5">
            <input
              v-model="title"
              type="text"
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            ></textarea>
          </div>

          <div class="text-rangmod-black">วันและเวลาที่นัด</div>

          <div class="flex flex-col">
            <div
              v-for="(engageDate, i) in engageDates"
              :key="i"
              class="flex flex-row relative"
            >
              <div class="flex flex-row space-x-4">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป</div>
                  <input
                    type="text"
                    class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    :value="engageDate.date"
                  />
                </div>

                <div class="mb-5">
                  <div class="text-rangmod-black">เวลา</div>
                  <input
                    type="text"
                    class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    :value="engageDate.time"
                  />
                </div>
              </div>
            </div>
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
            type: Number
        }
    },
  data() {
    return {
      title: "testFinal",
      category: "test001", //mockup dont del
      description: "testFinal",
      status: "รอรับเรื่อง",
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
          dateTime: '',
          // isActive: false,
        },
        {
          date: "2022-07-26",
          time: "09:04:27",
          dateTime: '',
          // isActive: true,
        },
        {
          date: "2022-09-27",
          time: "10:06:27",
          dateTime: '',
          // isActive: false,
        },
        {
          date: "2022-11-28",
          time: "11:08:27",
          dateTime: '',
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
          color: "text-rangmod-green",
          status: "เสร็จสิ้น",
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          status: "รอซ่อม",
        },
        {
          id: "3",
          color: "text-rangmod-red",
          status: "ยกเลิกนัด",
        },
        {
          id: "4",
          color: "text-rangmod-blue",
          status: "เลื่อนนัด",
        },
        {
          id: "5",
          color: "text-rangmod-dark-blue",
          status: "รอรับเรื่อง",
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
    };
  },
  mounted() {
    this.create();
    // this.dateFormat("2022-05-25 08:02:27");
  },
  methods: {
    async create() {
      this.reportList = await this.getReport();
      this.customers = await this.getCustomers();
      this.createdBy = this.getUserLogin();
      console.log(this.createdBy);
      console.log(this.reportList)
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
      fetch(`https://dev.rungmod.com/api/report`, {
        // fetch(`http://localhost:5000/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title: this.title,
          CategoriesReport: this.category,
          ReportDes: this.description,
          Status: this.status,
          CreatedBy: this.createdBy,
        }),
      })
        .then((response) => {
          const res = response.json();
          console.log("Add report!");
          return res;
        })
        .then((response) => {
          this.sendEngageDate(response);
          console.log(response);
        });
    },
    sendEngageDate(reportId) {
      fetch(`https://dev.rungmod.com/api/CreateReportEngage`, {
        // fetch(`http://localhost:5000/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Date1: this.engageDates[0].date + " " + this.engageDates[0].time,
          Date2: this.engageDates[1].date + " " + this.engageDates[1].time,
          Date3: this.engageDates[2].date + " " + this.engageDates[2].time,
          Date4: this.engageDates[3].date + " " + this.engageDates[3].time,
          ReportId: reportId,
          SelectDate: 1
        }),
      }).then((res) => {
        console.log(res);
        console.log("Add report!");
      });
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
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      return formatedDate;
    },
    async getCustomers() {
      try {
        const res = await fetch("https://dev.rungmod.com/api/customer");
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    getUserLogin() {
      for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].email == localStorage.email) {
          console.log(this.engageDates[0].date + " " + this.engageDates[0].time)
          return this.customers[i].customerId
        }
      }
    }
  },
};
</script>

<style></style>
