<template>
  <SearchPanel />
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลการรายงานปัญหา</div>
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
    <div v-else-if="noData" class="mx-auto w-full">
      <div class="text-rangmod-black my-10 mx-auto w-fit">ไม่มีรายงานปัญหา</div>
    </div>
    <div
      v-else
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
              openStatusFilter ? 'transition-all rotate-180' : 'transition-all'
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
        <th class="py-4">&nbsp;</th>
      </tr>

      <tr
        v-for="(request, i) in filteredRequest"
        :key="i"
        class="border-b border-rangmod-gray/40 transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-2 px-2">{{ i + 1 }}</td>
        <td class="text-center py-2 px-2">{{ request.roomNum }}</td>
        <td class="text-center py-2 px-2">{{ request.reportId }}</td>
        <td class="text-center truncate max-w-[120px] py-2 px-2">
          {{ request.title }}
        </td>
        <td class="text-center py-2">
          {{ splitDate(request.createdAt) }}
        </td>
        <td class="text-center py-2">{{ splitDate(request.fixDate) }}</td>
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
        v-for="(request, i) in filteredRequest"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between font-bold">
          <div>{{ i + 1 }}</div>
        </div>
        <hr class="my-2 border-rangmod-gray" />
        <div class="flex flex-row justify-between">
          <div>รหัสรายงาน</div>
          <div>{{ request.reportId }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ห้อง</div>
          <div>{{ request.roomNum }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>หัวข้อปัญหา</div>
          <div class="truncate max-w-[120px]">{{ request.title }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป แจ้งซ่อม</div>
          <div>{{ splitDate(request.createdAt) }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป นัดซ่อม</div>
          <div>{{ splitDate(request.fixDate) }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>สถานะ</div>
          <div>
            <div v-for="(status, j) in statusList" :key="j">
              <div
                v-if="this.checkThaiStatus(request.status) == status.name"
                :class="status.color"
              >
                {{ this.checkThaiStatus(request.status) }}
              </div>
            </div>
          </div>
        </div>

        <RouterLink :to="`/dashboard/report/${request.reportId}`">
          <div
            class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          >
            รายละเอียด
          </div>
        </RouterLink>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center">
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
import SearchPanel from "@/components/report/SearchPanel.vue";
export default {
  components: { SearchPanel },
  data() {
    return {
      token: "",
      createdBy: 0,
      openSortFilter: false,
      openStatusFilter: false,
      loading: false,
      loadingData: false,
      noData: false,
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
      requestList: [],
      filteredRequest: [],
    };
  },
  computed: {
    // loading() {
    //   if(this.memberList.length == 0 || this.filteredMember.length == 0) {
    //     return true
    //   }
    //   return false
    // }
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.loading = true;
      this.token = localStorage.getItem("token");
      this.createdBy = parseInt(localStorage.getItem("id"));
      this.requestList = await this.getAllRequest();
      this.filteredRequest = this.requestList;
      // console.log(this.filteredRequest);
      this.resetSort();
    },
    checkThaiStatus(status) {
      for (let i in this.statusList) {
        if (status == this.statusList[i].id) {
          return this.statusList[i].name;
        }
      }
    },
    async getAllRequest() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reports`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((res) => {
        if (res.length > 0) {
          this.loading = false;
          return res;
        } else {
          this.loading = false;
          this.noData = true;
          return null;
        }
        // return res
      });
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
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
    searchReportList(searchItem) {
      this.filteredRequest = this.requestList;
      console.log(searchItem);
      this.filteredRequest = this.filteredRequest.filter((request) => {
        return request.reportId
          .toString()
          .includes(searchItem.reportId.toString());
      });
      this.filteredRequest = this.filteredRequest.filter((request) => {
        return request.title.includes(searchItem.title);
      });
      this.filteredRequest = this.filteredRequest.filter((request) => {
        return request.roomNum.includes(searchItem.roomNum);
      });
    },
    statusFilter(status) {
      this.filteredRequest = this.requestList;
      if (status.id == "A1") {
        this.filteredRequest = this.filteredRequest.filter((request) => {
          return request.status.includes("");
        });
      } else {
        this.filteredRequest = this.filteredRequest.filter((request) => {
          return request.status.includes(this.filterItem.status.id);
        });
      }
    },
    sortFilter(sort) {
      this.resetSort();
      if (sort.eng == "reportId") {
        this.filteredRequest.sort(function (a, b) {
          return a.reportId - b.reportId;
        });
      }
      if (sort.eng == "roomNum") {
        this.filteredRequest.sort(function (a, b) {
          return parseInt(a.roomNum) - parseInt(b.roomNum);
        });
      }
      if (sort.eng == "date_d") {
        this.filteredRequest.sort(function (a, b) {
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return db - da; // -1
        });
      }
      if (sort.eng == "date_a") {
        this.filteredRequest.sort(function (a, b) {
          console.log(a);
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return da - db; // 1
        });
      }
      if (sort.eng == "fix_d") {
        this.filteredRequest.sort(function (a, b) {
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
        this.filteredRequest.sort(function (a, b) {
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
      this.filteredRequest.sort(function (a, b) {
        return a.reportId - b.reportId;
      });
    },
  },
};
</script>

<style></style>
