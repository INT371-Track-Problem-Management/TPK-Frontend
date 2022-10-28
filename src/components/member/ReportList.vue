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
        <td class="text-center py-4">{{ report.selectedDate == '' ? '-' : engageDateShowFormat(report.selectedDate) }}
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

    <transition name="bounce">
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div
              @click="
                (showModal = false),
                  (validate.title = false),
                  (validate.description = false),
                  clearData()
              "
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
            รายละเอียดแจ้งซ่อม
          </div>
          <div class="grid grid-cols-2 space-x-2">
            <div>
              <div class="text-rangmod-black">หัวข้อปัญหา</div>
              <div class="mb-5">
                <input
                  v-model="title"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  :class="
                    this.validate.title
                      ? 'placeholder-red-500 border-red-500 border-2'
                      : ''
                  "
                  :placeholder="
                    this.validate.title ? 'กรุณาใส่หัวข้อปัญหา' : ''
                  "
                />
              </div>
            </div>
            <div>
              <div class="text-rangmod-black">ประเภทปัญหา</div>
              <div
                @click="isActivateCategory = !isActivateCategory"
                class="rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-col w-full mb-5 text-rangmod-black border border-rangmod-gray transition-all"
              >
                <div
                  class="flex items-center justify-between cursor-pointer px-4"
                >
                  <div>
                    <div v-if="this.category != ''">
                      {{ this.category.name }}
                    </div>
                    <div v-else class="text-rangmod-gray">เลือกประเภท</div>
                  </div>
                  <!-- <div>เลือกประเภทปัญหา</div> -->

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                    :class="
                      isActivateCategory
                        ? 'transition-all rotate-180'
                        : 'transition-all'
                    "
                  >
                    <path
                      d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                    />
                  </svg>
                </div>
                <transition name="bounce">
                  <div
                    v-show="isActivateCategory"
                    class="flex flex-row-reverse"
                  >
                    <div
                      class="z-50 max-h-96 overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
                    >
                      <div v-for="(category, i) in categoryLists" :key="i">
                        <div
                          class="py-2 hover:font-bold text-right cursor-pointer"
                          @click="
                            (this.category = category),
                              (isActivateCategory = true)
                          "
                        >
                          {{ category.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              :class="
                this.validate.description
                  ? 'placeholder-red-500 border-red-500 border-2'
                  : ''
              "
              :placeholder="
                this.validate.description ? 'กรุณาใส่รายละเอียดปัญหา' : ''
              "
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
    sendReport() {
      if (!this.validation()) {
        fetch(`${process.env.VUE_APP_API_URL}/customer/report`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            Title: this.title,
            CategoriesReport: this.category.engName,
            ReportDes: this.description,
            Status: this.status,
            CreatedBy: this.createdBy,
          }),
        })
          .then(() => {
            alert("Send report!");
            this.showModal = !this.showModal;
            this.clearData();
          })
          .then(async () => {
            this.reportList = await this.getReport();
            console.log(this.reportList);
          });
      }
    },
    async getReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reportByCreatedBy/${this.createdBy}`,
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
        if(status.toLowerCase() == this.statusList[i].eng) {
          return this.statusList[i].name
        }
      }
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
