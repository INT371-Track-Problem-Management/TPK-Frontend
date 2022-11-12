<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="flex items-center">
      <div
        @click="this.$router.back()"
        class="cursor-pointer hover:font-bold mr-2 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-chevron-left w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div class="text-xl">
        รายงานปัญหาห้อง {{ this.$route.params.roomNum }}
      </div>
    </div>

    <hr class="my-4 border-rangmod-purple" />

    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row space-x-2 items-center mb-4">
        <div
          @click="(showModal = true), (modalBg = true)"
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
        <td class="text-center py-4">{{ report.reportId }}</td>
        <td class="text-center py-4 truncate max-w-[120px]">
          {{ report.title }}
        </td>
        <td class="text-center py-4">
          {{ dateShowFormat(report.createdAt) }}
        </td>
        <td class="text-center py-4">
          {{ report.fixDate }}
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
      v-if="modalBg"
      class="bg-black fixed inset-0 opacity-60 visible z-[70]"
    ></div>
    <!-- <div
      v-if="loading || sentReport"
      class="bg-black fixed inset-0 opacity-60 visible z-[90]"
    ></div> -->

    <transition name="bounce">
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-[80] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || sentReport"
          class="bg-black fixed inset-0 opacity-60 visible z-[90]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-[600px] mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl relative overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="
                (showModal = false),
                  (validate.title = false),
                  (validate.description = false),
                  (modalBg = false),
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
          <div class="px-8">
            <div class="text-2xl text-rangmod-purple mb-5">
              รายละเอียดแจ้งซ่อม
            </div>

            <div>
              <div class="text-rangmod-black ml-1">ประเภทปัญหา</div>
              <div
                @click="isActivateCategory = !isActivateCategory"
                class="rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-col w-full mb-3 text-rangmod-black border border-rangmod-gray transition-all"
              >
                <div class="flex items-center justify-between cursor-pointer">
                  <div>
                    <div v-if="reportForSend.categoriesReport != ''">
                      {{ reportForSend.categoriesReport.name }}
                    </div>
                    <div v-else class="text-rangmod-gray">&nbsp;</div>
                  </div>
                  <!-- <input
                  v-model = "category.name"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                /> -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down text-rangmod-purple"
                    viewBox="0 0 16 16"
                    :class="
                      isActivateCategory
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
                <transition name="bounce">
                  <div
                    v-show="isActivateCategory"
                    class="flex flex-row-reverse w-full relative"
                  >
                    <div
                      class="w-full z-50 max-h-96 overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
                    >
                      <div v-for="(category, i) in categoryLists" :key="i">
                        <div
                          class="py-2 hover:font-bold text-right cursor-pointer"
                          @click="
                            (reportForSend.categoriesReport = category),
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
            <div>
              <div class="text-rangmod-black ml-1">หัวข้อปัญหา</div>
              <div class="mb-3">
                <input
                  v-model="reportForSend.title"
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

            <div class="text-rangmod-black ml-1">รายละเอียดปัญหา</div>
            <div class="mb-3">
              <textarea
                v-model="reportForSend.reportDes"
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
            <div
              v-on:click="uploadImage()"
              class="w-32 my-2 py-2 text-base rounded-full text-center text-white border-2 bg-rangmod-light-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-purple hover:text-rangmod-light-purple hover:shadow-none"
            >
              อัพโหลดรูปภาพ
            </div>
            <!-- <div>
              <h3>Default datepicker</h3>
              <DatePicker
                placeholder="Select Date"
              ></DatePicker>
              <code> </code>
            </div> -->
            <div v-for="(engage, i) in reportEngageDate" :key="i">
              <div class="mb-4">
                <div v-if="i == 0" class="text-rangmod-black ml-1">
                  วันและเวลาที่นัด
                </div>
                <div v-else class="text-rangmod-black ml-1">
                  วันและเวลา ({{ i + 1 }})
                </div>
                <div class="flex flex-col">
                  <div class="flex flex-row space-x-2 justify-between">
                    <div class="flex flex-col w-full">
                      <div class="text-rangmod-black ml-1">ด/ว/ป</div>
                      <input
                        v-model="engageForSend[i].date"
                        type="date"
                        class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                      />
                    </div>
                    <div class="flex flex-col w-full">
                      <div class="text-rangmod-black ml-1">
                        เวลาเริ่มต้น - เวลาสิ้นสุด
                      </div>
                      <div
                        @click="engage.isActive = !engage.isActive"
                        class="w-full h-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-col text-rangmod-black transition-all"
                      >
                        <div
                          class="flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <div v-if="engageForSend[i].period != ''">
                              {{ engageForSend[i].period }}
                            </div>
                            <div v-else class="text-rangmod-gray">&nbsp;</div>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-down text-rangmod-purple"
                            viewBox="0 0 16 16"
                            :class="
                              engage.isActive
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
                        <transition name="bounce">
                          <div
                            v-show="engage.isActive"
                            class="flex flex-row-reverse w-full relative"
                          >
                            <div
                              class="w-full z-50 max-h-48 overflow-auto no-scrollbar py-2 px-4 mt-2 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
                            >
                              <div v-for="(slot, j) in timeSlot" :key="j">
                                <div
                                  class="py-2 hover:font-bold text-right cursor-pointer"
                                  @click="
                                    (engage.isActive = true),
                                      (engageForSend[i].period = slot.period),
                                      (engageForSend[i].time = slot.time),
                                      (reportForSend.dates[i].date =
                                        manageDatetime(
                                          engageForSend[i].date,
                                          engageForSend[i].time
                                        ))
                                  "
                                >
                                  {{ slot.period }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row space-x-4 justify-end">
              <div
                v-on:click="sendReport()"
                class="w-32 my-2 py-2 text-base rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>

          <div
            v-if="loading"
            class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
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
            v-if="sentReport"
            class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
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
        <!-- <transition name="bounce">
          <div
            v-if="true"
            class="fixed w-full h-fit z-[110] inset-0 pb-20 pt-10 px-6 my-auto"
          >
            <div
              class="w-full h-full mx-auto items-center"
            >
              <div class="text-rangmod-green items-center">
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
        </transition> -->
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
    roomNum: {
      type: String,
    },
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      // report -------------------
      createdBy: parseInt(localStorage.getItem("id")),
      isActivateCategory: false,
      modalBg: false,
      showModal: false,
      loading: false,
      sentReport: false,
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
      sortList: [
        { key: "id", name: "รหัสรายงาน" },
        { key: "room", name: "ห้อง" },
        { key: "request_date", name: "ว/ด/ป แจ้งซ่อม" },
      ],
      statusList: [
      {
          id: "R1",
          eng: "reject",
          name: "ขอเปลี่ยนวันนัด",
          color: "text-rangmod-blue",
          bgcolor: "bg-rangmod-blue/20",
        },
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
      reportList: [],
      validate: {
        title: false,
        description: false,
      },
      reportEngageDate: [
        {
          title: "date1",
          date: "",
          ogdate: "",
          time: "",
          ogtime: "",
          isActive: false,
        },
        {
          title: "date2",
          date: "",
          ogdate: "",
          time: "",
          ogtime: "",
          isActive: false,
        },
        {
          title: "date3",
          date: "",
          ogdate: "",
          time: "",
          ogtime: "",
          isActive: false,
        },
        {
          title: "date4",
          date: "",
          ogdate: "",
          time: "",
          ogtime: "",
          isActive: false,
        },
      ],
      timeSlot: [
        {
          period: "08:00 - 09:00",
          time: "08:00:00",
        },
        {
          period: "09:00 - 10:00",
          time: "09:00:00",
        },
        {
          period: "10:00 - 11:00",
          time: "10:00:00",
        },
        {
          period: "11:00 - 12:00",
          time: "11:00:00",
        },
        {
          period: "12:00 - 13:00",
          time: "12:00:00",
        },
        {
          period: "13:00 - 14:00",
          time: "13:00:00",
        },
        {
          period: "14:00 - 15:00",
          time: "14:00:00",
        },
        {
          period: "15:00 - 16:00",
          time: "15:00:00",
        },
        {
          period: "16:00 - 17:00",
          time: "16:00:00",
        },
        {
          period: "17:00 - 18:00",
          time: "17:00:00",
        },
        {
          period: "18:00 - 19:00",
          time: "18:00:00",
        },
      ],
      reportForSend: {
        categoriesReport: "",
        title: "",
        reportDes: "",
        status: "S1",
        roomId: parseInt(this.$route.params.id),
        buildingId: 0,
        step: 1,
        dates: [{ date: "" }, { date: "" }, { date: "" }, { date: "" }],
        updateBy: parseInt(localStorage.getItem("id")),
      },
      engageForSend: [
        {
          date: "",
          time: "",
          period: "",
          datetime: "",
        },
        {
          date: "",
          time: "",
          period: "",
          datetime: "",
        },
        {
          date: "",
          time: "",
          period: "",
          datetime: "",
        },
        {
          date: "",
          time: "",
          period: "",
          datetime: "",
        },
      ],
    };
  },
  computed: {
    buildingId() {
      const splitedRoomNum = this.$route.params.roomNum;
      return parseInt(splitedRoomNum.slice(0, splitedRoomNum.length - 3));
    },
  },
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
      this.reportList = await this.getReport();
      console.log(this.buildingId);
      console.log(this.reportList);
    },
    doFilter(id) {
      console.log(`Filtered by ${id} !`);
    },
    doSort(id) {
      console.log(`Sorted by ${id} !`);
    },
    async sendReport() {
      let rfs = this.reportForSend;
      this.modalBg = false;
      this.loading = true;
      console.log(this.loading);
      // if (!this.validation()) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/report`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            title: rfs.title,
            categoriesReport: rfs.categoriesReport.engName,
            reportDes: rfs.reportDes,
            status: rfs.status,
            roomId: rfs.roomId,
            buildingId: this.buildingId,
            step: rfs.step,
            dates: rfs.dates,
            updateBy: rfs.updateBy,
          }),
        }
      );
      const data = res.json();
      return data.then(async (data) => {
        if (typeof data === "number") {
          this.loading = false;
          this.sentReport = true;
          setTimeout(() => {
            this.sentReport = false;
          }, 1500);
          setTimeout(() => {
            this.showModal = false;
            this.clearData();
          }, 2500);
          this.reportList = await this.getReport();
        }
      });
    },
    async uploadImage() {
      console.log("upload image");
    },
    async getReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reports?roomId=${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      console.log();
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
    dateShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      // const formatedTime = date.toLocaleTimeString("th-TH", {
      //   hour: "numeric",
      //   minute: "numeric",
      //   second: "numeric",
      // });
      return formatedDate;
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
    engageShowFormat(engage) {
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      const showTime = res[1].split("Z");
      return showDate + " " + showTime[0];
    },
    engageDateShowFormat(engage) {
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      // const showTime = res[1].split('Z')
      return showDate;
    },
    manageDatetime(date, time) {
      return date + " " + time;
    },
    // fillReportForSend(datetime) {

    // }
  },
};
</script>

<style scoped></style>
