<template>
  <SearchPanel />
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายงานปัญหา</div>
    <hr class="my-4 border-rangmod-purple" />
    <div
      v-if="loadingData"
      class="w-full h-full inset-0 flex items-center justify-center z-[110]"
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
    <div v-else>
      <div
        class="flex flex-col ssm-2:flex-row justify-end items-end space-x-4 transition-all"
      >
        <div class="mb-4 relative">
          <div
            @click="openStatusFilter = !openStatusFilter"
            class="w-48 bg-white rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-end space-x-2 cursor-pointer items-center"
          >
            <div
              v-if="filterItem.status.name == 'ทั้งหมด'"
              class="cursor-pointer"
              :class="filterItem.status.color"
            >
              สถานะ{{ filterItem.status.name }}
            </div>
            <div v-else class="cursor-pointer" :class="filterItem.status.color">
              {{ filterItem.status.name }}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
              viewBox="0 0 16 16"
              :class="
                openStatusFilter
                  ? 'transition-all rotate-180'
                  : 'transition-all'
              "
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div
            class="w-full absolute flex flex-col z-[100]"
            :class="
              openStatusFilter
                ? 'py-2 px-4 transition-all h-56 border-2 border-rangmod-light-gray rounded-lg bg-white divide-y divide-rangmod-light-gray shadow-xl overflow-y-auto no-scrollbar'
                : 'max-h-[0vh]'
            "
          >
            <div
              v-for="(status, i) in sortStatus"
              :key="i"
              class="w-full flex justify-end"
              :class="
                openStatusFilter
                  ? 'h-fit hover:font-bold cursor-pointer'
                  : 'max-h-[0vh]'
              "
            >
              <div
                @click="
                  (filterItem.status = status),
                    (openStatusFilter = false),
                    statusFilter(status)
                "
                :class="
                  openStatusFilter
                    ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                    : 'opacity-0 max-h-[0vh]'
                "
              >
                <div :class="status.color">
                  {{ status.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4 relative">
          <div
            @click="openSortFilter = !openSortFilter"
            class="w-56 bg-white rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-end space-x-2 cursor-pointer items-center"
          >
            <div class="cursor-pointer text-rangmod-purple">
              เรียงตาม{{ filterItem.sort.name }}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
              viewBox="0 0 16 16"
              :class="
                openSortFilter ? 'transition-all rotate-180' : 'transition-all'
              "
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div
            class="w-full absolute flex flex-col z-[100]"
            :class="
              openSortFilter
                ? 'py-2 px-4 transition-all h-fit border-2 border-rangmod-light-gray rounded-lg bg-white divide-y divide-rangmod-light-gray shadow-xl overflow-y-auto no-scrollbar'
                : 'max-h-[0vh]'
            "
          >
            <div
              v-for="(sort, i) in sortList"
              :key="i"
              class="w-full flex justify-end"
              :class="
                openSortFilter
                  ? 'max-h-min h-fit hover:font-bold cursor-pointer'
                  : 'max-h-[0vh]'
              "
            >
              <div
                @click="
                  (filterItem.sort = sort),
                    (openSortFilter = false),
                    sortFilter(sort)
                "
                :class="
                  openSortFilter
                    ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                    : 'opacity-0 max-h-[0vh]'
                "
              >
                <div class="text-rangmod-purple">
                  {{ sort.name }}
                </div>
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
          v-for="(report, i) in filteredReport"
          :key="i"
          class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
        >
          <td class="text-center py-4">{{ i + 1 }}</td>
          <td class="text-center py-4">{{ report.roomNum }}</td>
          <td class="text-center py-4">{{ report.reportId }}</td>
          <td class="text-center py-4 truncate max-w-[120px]">
            {{ report.title }}
          </td>
          <td class="text-center py-4">
            {{ dateShowFormat(report.createdAt) }}
          </td>
          <td class="text-center py-4">{{ splitDate(report.fixDate) }}</td>
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
      <div class="flex flex-col md:hidden mb-10">
        <div
          v-for="(report, i) in filteredReport"
          :key="i"
          class="w-full rounded-xl shadow-md p-4 mb-4"
        >
          <div class="flex flex-row justify-between font-bold">
            <div>{{ i + 1 }}</div>
          </div>
          <hr class="my-2 border-rangmod-gray" />
          <div class="flex flex-row justify-between">
            <div>รหัสรายงาน</div>
            <div>{{ report.reportId }}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>ห้อง</div>
            <div>{{ report.roomNum }}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>หัวข้อปัญหา</div>
            <div class="truncate max-w-[120px]">{{ report.title }}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>ว/ด/ป แจ้งซ่อม</div>
            <div>{{ splitDate(report.createdAt) }}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>ว/ด/ป นัดซ่อม</div>
            <div>{{ splitDate(report.fixDate) }}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>สถานะ</div>
            <div>
              <div v-for="(status, j) in statusList" :key="j">
                <div
                  v-if="this.checkThaiStatus(report.status) == status.name"
                  :class="status.color"
                >
                  {{ this.checkThaiStatus(report.status) }}
                </div>
              </div>
            </div>
          </div>

          <RouterLink
            :to="{
              name: 'member-report-detail',
              params: { id: report.reportId },
            }"
          >
            <div
              class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
            >
              รายละเอียด
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="bg-black fixed inset-0 opacity-60 visible z-[80]"
    ></div>
  </div>
</template>

<script>
import SearchPanel from "@/components/report/SearchPanel.vue";
export default {
  components: { SearchPanel },
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
      loadingData: false,
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

      openSortFilter: false,
      openStatusFilter: false,
      filterItem: {
        sort: { eng: "reportId", name: "รหัสรายงาน" },
        status: {
          id: "A1",
          eng: "all",
          name: "ทั้งหมด",
          color: "text-rangmod-black",
        },
      },
      sortList: [
        { eng: "reportId", name: "รหัสรายงาน" },
        { eng: "roomNum", name: "ห้อง" },
        { eng: "date_d", name: "วันแจ้งซ่อมใหม่" },
        { eng: "date_a", name: "วันแจ้งซ่อมเก่า" },
        { eng: "fix_d", name: "วันนัดซ่อมใหม่" },
        { eng: "fix_a", name: "วันนัดซ่อมเก่า" },
      ],
      sortStatus: [
        {
          id: "A1",
          eng: "all",
          name: "ทั้งหมด",
          color: "text-rangmod-black",
        },
        {
          id: "S1",
          eng: "waiting",
          name: "รอรับเรื่อง",
          color: "text-rangmod-blue",
        },
        {
          id: "R1",
          eng: "reject",
          name: "ขอเลื่อนนัด",
          color: "text-rangmod-ppbtn-purple",
        },
        {
          id: "S5",
          eng: "postpone",
          name: "เลื่อนนัด",
          color: "text-rangmod-purple",
        },
        {
          id: "S4",
          eng: "prepare",
          name: "รอดำเนินการ",
          color: "text-rangmod-yellow",
        },
        {
          id: "S6",
          eng: "cancel",
          name: "ยกเลิกนัด",
          color: "text-rangmod-red",
        },
        {
          id: "S9",
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          color: "text-rangmod-dark-pink",
        },
        {
          id: "S7",
          eng: "success",
          name: "เสร็จสิ้น",
          color: "text-rangmod-green",
        },
      ],
      statusList: [
        {
          id: "R1",
          eng: "reject",
          name: "ขอเลื่อนนัด",
          color: "text-rangmod-ppbtn-purple",
        },
        {
          id: "S1",
          eng: "waiting",
          name: "รอรับเรื่อง",
          color: "text-rangmod-blue",
        },
        {
          id: "S2",
          eng: "accept",
          name: "รับเรื่อง",
          color: "text-rangmod-yellow",
        },
        {
          id: "S3",
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          color: "text-rangmod-yellow",
        },
        {
          id: "S4",
          eng: "prepare",
          name: "รอดำเนินการ",
          color: "text-rangmod-yellow",
        },
        {
          id: "S5",
          eng: "postpone",
          name: "เลื่อนนัด",
          color: "text-rangmod-purple",
        },
        {
          id: "S6",
          eng: "cancel",
          name: "ยกเลิกนัด",
          color: "text-rangmod-red",
        },
        {
          id: "S7",
          eng: "success",
          name: "เสร็จสิ้น",
          color: "text-rangmod-green",
        },
        {
          id: "S8",
          eng: "defer",
          name: "รอยืนยันเลื่อนนัด",
          color: "text-rangmod-purple",
        },
        {
          id: "S9",
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          color: "text-rangmod-dark-pink",
        },
      ],
      reportList: [],
      filteredReport: [],
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
      this.loadingData = true;
      this.token = localStorage.getItem("token");
      this.createdBy = parseInt(localStorage.getItem("id"));
      this.reportList = await this.getReport();
      this.filteredReport = this.reportList;
      if (this.reportList) {
        this.loadingData = false;
      }
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
      for (let i in this.statusList) {
        if (status == this.statusList[i].id) {
          return this.statusList[i].name;
        }
      }
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
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
    searchReportList(searchItem) {
      this.filteredReport = this.reportList;
      console.log(searchItem);
      this.filteredReport = this.filteredReport.filter((report) => {
        return report.reportId
          .toString()
          .includes(searchItem.reportId.toString());
      });
      this.filteredReport = this.filteredReport.filter((report) => {
        return report.title.includes(searchItem.title);
      });
      this.filteredReport = this.filteredReport.filter((report) => {
        return report.roomNum.includes(searchItem.roomNum);
      });
    },
    statusFilter(status) {
      this.filteredReport = this.reportList;
      if (status.id == "A1") {
        this.filteredReport = this.filteredReport.filter((report) => {
          return report.status.includes("");
        });
      } else {
        this.filteredReport = this.filteredReport.filter((report) => {
          return report.status.includes(this.filterItem.status.id);
        });
      }
    },
    sortFilter(sort) {
      this.resetSort();
      if (sort.eng == "reportId") {
        this.filteredReport.sort(function (a, b) {
          return a.reportId - b.reportId;
        });
      }
      if (sort.eng == "roomNum") {
        this.filteredReport.sort(function (a, b) {
          return parseInt(a.roomNum) - parseInt(b.roomNum);
        });
      }
      if (sort.eng == "date_d") {
        this.filteredReport.sort(function (a, b) {
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return db - da; // -1
        });
      }
      if (sort.eng == "date_a") {
        this.filteredReport.sort(function (a, b) {
          console.log(a);
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return da - db; // 1
        });
      }
      if (sort.eng == "fix_d") {
        this.filteredReport.sort(function (a, b) {
          const fa = new Date(a.fixDate);
          const fb = new Date(b.fixDate);
          if (isNaN(fa)) {
            return 1;
          }
          if (isNaN(fb)) {
            return -1;
          }
          return fb - fa; // -1
        });
      }
      if (sort.eng == "fix_a") {
        this.filteredReport.sort(function (a, b) {
          const fa = new Date(a.fixDate);
          const fb = new Date(b.fixDate);
          if (isNaN(fa)) {
            return 1;
          }
          if (isNaN(fb)) {
            return -1;
          }
          return fa - fb; // 1
        });
      }
    },
    resetSort() {
      this.filteredReport.sort(function (a, b) {
        return a.reportId - b.reportId;
      });
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
