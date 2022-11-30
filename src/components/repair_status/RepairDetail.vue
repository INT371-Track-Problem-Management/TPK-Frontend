<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary mb-10 px-5 mx-5 shadow-md py-2"
  >
    <div class="text-xl my-5">รายละเอียดและสถานะ</div>
    <hr class="my-5 border-rangmod-purple" />
    <div class="w-full">
      <div class="flex flex-col md:flex-row my-5 mx-auto w-fit">
        <div class="text-xl text-center my-1">ตรวจสอบสถานะแจ้งซ่อม</div>
        <div class="border border-rangmod-gray rounded-lg mx-10 my-1">
          <input
            v-model="reportId"
            @keyup.enter="searchReport(reportId)"
            type="number"
            class="rounded-lg outline-none px-2 text-center md:text-left"
          />
        </div>
      </div>
    </div>
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
    <div v-if="noData" class="mx-auto w-full">
      <div class="text-rangmod-black my-10 mx-auto w-fit">
        ไม่มีรหัสรายงานนี้
      </div>
    </div>
    <div
      v-if="
        reportDetail.reportId &&
        reportEngage.engageId &&
        assignedMaintainer.maintainerId &&
        activateStatus.length > 0
      "
    >
      <div class="flex flex-col mx-0 ssm-3:mx-16 transition-all">
        <div
          class="z-20 w-full mx-auto rounded-2xl bg-rangmod-light-pink py-2 px-4 flex flex-row justify-between border border-rangmod-purple cursor-pointer"
        >
          <div
            @click="openReportStatus = !openReportStatus"
            class="w-full mx-auto rounded-2xl bg-rangmod-light-pink flex flex-row justify-between cursor-pointer"
          >
            <div>รหัสรายงาน : {{ reportDetail.reportId }}</div>
            <div class="my-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down text-rangmod-purple"
                viewBox="0 0 16 16"
                :class="
                  openReportStatus
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
          </div>
        </div>
        <div
          class="z-10 w-full mx-auto -mt-4 rounded-b-2xl bg-white px-4 border border-rangmod-purple transition-all"
          :class="
            openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '
          "
        >
          <div
            class="md:px-16 mb-10 w-full"
            :class="
              openReportStatus
                ? 'delay-250 transition-all duration-200 max-h-min h-fit delay-150'
                : 'opacity-0 max-h-[0vh]'
            "
          >
            <div
              class="w-full"
              :class="
                openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '
              "
            >
              <div
                class="flex flex-row justify-center my-10 items-center w-full"
              >
                <div
                  class="items-center rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-yellow bg-rangmod-stat-light-yellow"
                >
                  <div
                    class="items-center w-full h-full flex flex-col justify-center"
                  >
                    <img
                      src="@/assets/images/sent.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                  </div>
                  <div
                    class="text-base font-primary text-center mt-2 hidden ssm:block"
                  >
                    แจ้งปัญหา
                  </div>
                </div>

                <div
                  class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                  :class="
                    true ? 'bg-rangmod-stat-yellow' : 'bg-rangmod-stat-gray'
                  "
                ></div>
                <div
                  class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                  :class="
                    true
                      ? 'border-rangmod-stat-yellow bg-rangmod-stat-light-yellow'
                      : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                  "
                >
                  <div
                    class="items-center w-full h-full flex flex-col justify-center"
                  >
                    <img
                      v-if="true"
                      src="@/assets/images/success.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                    <img
                      v-else
                      src="@/assets/images/success_bw.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                  </div>
                  <div
                    class="text-base font-primary text-center mt-2 hidden ssm:block"
                  >
                    รับเรื่อง
                  </div>
                </div>

                <div
                  class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                  :class="
                    true ? 'bg-rangmod-stat-yellow' : 'bg-rangmod-stat-gray'
                  "
                ></div>
                <div
                  class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                  :class="
                    true
                      ? 'border-rangmod-stat-yellow bg-rangmod-stat-light-yellow'
                      : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                  "
                >
                  <div
                    class="items-center w-full h-full flex flex-col justify-center"
                  >
                    <img
                      v-if="true"
                      src="@/assets/images/sand.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                    <img
                      v-else
                      src="@/assets/images/sand_bw.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                  </div>
                  <div
                    class="text-base font-primary text-center mt-2 hidden ssm:block"
                  >
                    รอดำเนินการ
                  </div>
                </div>

                <div
                  class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                  :class="
                    true ? 'bg-rangmod-stat-yellow' : 'bg-rangmod-stat-gray'
                  "
                ></div>
                <div
                  class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                  :class="
                    true
                      ? 'border-rangmod-stat-green bg-rangmod-stat-light-green'
                      : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                  "
                >
                  <div
                    class="items-center w-full h-full flex flex-col justify-center"
                  >
                    <img
                      v-if="true"
                      src="@/assets/images/check.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                    <img
                      v-else
                      src="@/assets/images/check_bw.png"
                      class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                    />
                  </div>
                  <div
                    class="text-base font-primary text-center mt-2 hidden ssm:block"
                  >
                    เสร็จสิ้น
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-row justify-start ssm:mt-28 mt-14 xse:px-12 ssm:px-10 px-2"
              :class="
                openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '
              "
            >
              <div>
                <div
                  v-for="(status, i) in activateStatus"
                  :key="i"
                  class="flex flex-col-reverse items-start relative"
                  :class="
                    openReportStatus
                      ? 'max-h-min h-fit delay-150'
                      : 'max-h-[0vh] '
                  "
                >
                  <div
                    class="flex flex-col items-start -mt-4"
                    :class="
                      openReportStatus
                        ? 'max-h-min h-fit delay-150'
                        : 'max-h-[0vh] '
                    "
                  >
                    <div
                      v-show="status.divider"
                      class="w-0.5 h-16 bg-rangmod-step-yellow ml-[2.75px] z-10"
                      :class="
                        openReportStatus
                          ? 'max-h-min h-fit delay-150'
                          : 'max-h-[0vh] '
                      "
                    ></div>
                    <div
                      class="flex flex-row justify-start items-center -mt-4"
                      :class="
                        openReportStatus
                          ? 'max-h-min h-fit delay-150'
                          : 'max-h-[0vh] '
                      "
                    >
                      <div
                        v-show="status.isActive"
                        class="w-2 h-2 rounded-full border z-20"
                        :class="
                          i == 0
                            ? 'border-rangmod-step-yellow bg-rangmod-step-yellow'
                            : 'border-rangmod-step-yellow bg-white'
                        "
                      ></div>
                      <div
                        v-show="status.isActive"
                        class="px-3 text-base"
                        :class="
                          openReportStatus
                            ? 'max-h-min h-fit delay-150'
                            : 'max-h-[0vh] '
                        "
                      >
                        {{ status.th }} ({{ dateShowFormat(status.createdAt) }})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-12 border-rangmod-purple" />
      <div class="mx-0 ssm-3:mx-16">
        <div class="flex flex-col-reverse lg:flex-row mb-6">
          <div class="w-full flex justify-center lg:justify-start">
            <div class="flex flex-col justify-start sm:w-4/5 w-full">
              <div class="pr-0">
                <div class="text-rangmod-black ml-1">ประเภทปัญหา</div>
                <div class="mb-5">
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ filterCategory(reportDetail.categoriesReport) }}
                  </div>
                </div>

                <div class="text-rangmod-black ml-1">หัวข้อปัญหา</div>
                <div class="mb-5">
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ reportDetail.title }}
                  </div>
                </div>

                <div class="text-rangmod-black ml-1">รายละเอียดปัญหา</div>
                <div class="mb-5">
                  <textarea
                    v-model="this.reportDetail.reportDes"
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    readonly
                  ></textarea>
                </div>

                <div class="flex flex-row space-x-2 ml-1 mb-5">
                  <div class="text-rangmod-black">ดูรูปภาพ</div>
                  <div
                    @click="previewImage(reportDetail.imageId)"
                    class="text-[#007AFF] cursor-pointer items-center hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      class="bi bi-image"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                      />
                      <path
                        d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="mb-4">
                  <div class="text-rangmod-black ml-1">วันและเวลาที่นัด</div>
                  <div class="flex flex-col">
                    <div class="flex flex-row space-x-2 justify-between">
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          v-if="splitDate(fixDate) != ''"
                          class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(fixDate) }}
                        </div>
                        <div
                          v-else
                          class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          &nbsp;
                        </div>
                      </div>
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">
                          เวลาเริ่มต้น - สิ้นสุด
                        </div>
                        <div class="flex flex-row relative">
                          <div
                            v-if="splitTime(fixDate) != ''"
                            class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          >
                            {{ splitTime(fixDate) }}
                          </div>
                          <div
                            v-else
                            class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          >
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex justify-center lg:justify-end mb-5">
            <div class="flex flex-col space-y-8 h-fit sm:w-4/5 w-full">
              <div
                class="border border-rangmod-purple bg-white rounded-3xl h-fit xse-2:px-10 px-5 w-full"
                :class="reportEngage.maintainerId != 0 ? '' : 'hidden'"
              >
                <div class="flex flex-col justify-start w-full">
                  <div class="text-rangmod-purple my-5">ข้อมูลช่าง</div>
                  <div class="w-full flex flex-row space-x-4">
                    <div class="w-full">
                      <div class="text-rangmod-black ml-1">ชื่อ</div>
                      <div class="mb-5">
                        <div
                          class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                        >
                          <div>
                            {{ assignedMaintainer.fname }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full">
                      <div class="text-rangmod-black ml-1">นามสกุล</div>
                      <div class="mb-5">
                        <div
                          class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                        >
                          <div>
                            {{ assignedMaintainer.lname }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-rangmod-black ml-1">เบอร์ติดต่อช่าง</div>
                  <div class="mb-5">
                    <div
                      class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                    >
                      {{ assignedMaintainer.phone }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border border-rangmod-purple bg-rangmod-light-pink rounded-3xl xse-2:px-10 px-5 w-full h-fit overflow-y-scroll no-scrollbar"
                :class="this.reportDetail.status == 'R1' ? '' : 'hidden'"
              >
                <div class="">
                  <div class="flex flex-col justify-start w-full mb-5">
                    <div class="text-rangmod-purple text-xl my-5">
                      ขอเปลี่ยนวันนัด
                    </div>
                    <div class="w-full">
                      <div class="text-rangmod-black ml-1">เหตุผล</div>
                      <div class="mb-5">
                        <textarea
                          v-model="postponeDetail.description"
                          class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          readonly
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="text-rangmod-red text-base"
                :class="this.reportDetail.status == 'R1' ? '' : 'hidden'"
              >
                *กรุณาเข้าสู่ระบบเพื่อทำการนัดวันซ่อมใหม่
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="modalbg"
        class="bg-black fixed inset-0 opacity-60 visible z-[70]"
      ></div>
      <transition name="bounce">
        <div
          v-show="showImage"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
        >
          <div
            class="min-w-[320px] max-w-[440px] min-h-[320px] max-h-[440px] mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <div class="flex justify-end">
              <div
                @click="(showImage = !showImage), (modalbg = false)"
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
            <div class="items-center">
              <div
                class="w-40 h-40 ssm:w-80 ssm:h-80 z-[150] mx-auto flex flex-col justify-center"
              >
                <img :src="this.image" class="" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      createdBy: localStorage.getItem("id"),
      reportId: "",
      reportDetail: {},
      reportEngage: {},
      noData: false,
      loadingData: false,
      loading: false,
      showImage: false,
      modalbg: false,
      openReportStatus: false,
      categoryLists: [
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
      statusList: [
        {
          id: "R1",
          eng: "reject",
          name: "ขอเลื่อนนัด",
          divider: false,
          isActive: true,
        },
        {
          id: "S1",
          eng: "waiting",
          name: "รอรับเรื่อง",
          divider: false,
          isActive: true,
        },
        {
          id: "S2",
          eng: "accept",
          name: "รับเรื่อง",
          divider: true,
          isActive: true,
        },
        {
          id: "S3",
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          divider: true,
          isActive: true,
        },
        {
          id: "S4",
          eng: "prepare",
          name: "รอดำเนินการ",
          divider: true,
          isActive: true,
        },
        {
          id: "S5",
          eng: "postpone",
          name: "เลื่อนนัด",
          divider: true,
          isActive: true,
        },
        {
          id: "S6",
          eng: "cancel",
          name: "ยกเลิกนัด",
          divider: true,
          isActive: true,
        },
        {
          id: "S7",
          eng: "success",
          name: "เสร็จสิ้น",
          divider: true,
          isActive: true,
        },
        {
          id: "S8",
          eng: "defer",
          name: "รอยืนยันการเลื่อนนัดซ่อม",
          divider: true,
          isActive: true,
        },
        {
          id: "S9",
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          divider: true,
          isActive: true,
        },
      ],
      reportEngageDate: [
        {
          title: "date1",
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "09:00 - 10:00",
          datetime: "",
          isActive: false,
        },
        {
          title: "date2",
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "10:00 - 11:00",
          datetime: "",
          isActive: false,
        },
        {
          title: "date3",
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "11:00 - 12:00",
          datetime: "",
          isActive: false,
        },
        {
          title: "date4",
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "12:00 - 13:00",
          datetime: "",
          isActive: false,
        },
      ],
      postponeDetail: {
        description: "",
        newEngageDate: [],
      },
      fixDate: "",
      assignedMaintainer: {},
      isEngageDateNow: false,
      activateStatus: [],
      periodList: [
        {
          eng: "AM",
          th: "เช้า",
        },
        {
          eng: "PM",
          th: "บ่าย",
        },
        {
          eng: "ALL",
          th: "ทั้งวัน",
        },
      ],
      periodTimeList: {
        AM: [
          {
            slot: "08:00 - 09:00",
            time: "08:00:00",
          },
          {
            slot: "09:00 - 10:00",
            time: "09:00:00",
          },
          {
            slot: "10:00 - 11:00",
            time: "10:00:00",
          },
          {
            slot: "11:00 - 12:00",
            time: "11:00:00",
          },
          {
            slot: "12:00 - 13:00",
            time: "12:00:00",
          },
        ],
        PM: [
          {
            slot: "13:00 - 14:00",
            time: "08:00:00",
          },
          {
            slot: "14:00 - 15:00",
            time: "09:00:00",
          },
          {
            slot: "15:00 - 16:00",
            time: "10:00:00",
          },
          {
            slot: "16:00 - 17:00",
            time: "11:00:00",
          },
          {
            slot: "17:00 - 18:00",
            time: "12:00:00",
          },
          {
            slot: "18:00 - 19:00",
            time: "12:00:00",
          },
        ],
        ALL: [
          {
            slot: "08:00 - 09:00",
            time: "08:00:00",
          },
          {
            slot: "09:00 - 10:00",
            time: "09:00:00",
          },
          {
            slot: "10:00 - 11:00",
            time: "10:00:00",
          },
          {
            slot: "11:00 - 12:00",
            time: "11:00:00",
          },
          {
            slot: "12:00 - 13:00",
            time: "12:00:00",
          },
          {
            slot: "13:00 - 14:00",
            time: "13:00:00",
          },
          {
            slot: "14:00 - 15:00",
            time: "14:00:00",
          },
          {
            slot: "15:00 - 16:00",
            time: "15:00:00",
          },
          {
            slot: "16:00 - 17:00",
            time: "16:00:00",
          },
          {
            slot: "17:00 - 18:00",
            time: "17:00:00",
          },
          {
            slot: "18:00 - 19:00",
            time: "18:00:00",
          },
        ],
      },
    };
  },
  computed: {
    isCancel() {
      return this.reportDetail.status == "S6";
    },
    statusIsAccept() {
      return true;
    },
  },
  mounted() {},
  methods: {
    filterSelectedDate() {
      for (let i in this.reportEngage.fixDate) {
        if (this.reportEngage.fixDate[i].id == this.reportEngage.selectedDate) {
          this.fixDate = this.reportEngage.fixDate[i].date;
          break;
        }
      }
    },
    resetData() {
      this.reportDetail = {};
      this.reportEngage = {};
      this.assignedMaintainer = {};
      this.activateStatus = [];
    },
    async searchReport(reportId) {
      if (reportId == "") {
        this.resetData();
      } else {
        this.resetData();
        this.noData = false;
        this.loadingData = true;
        this.reportDetail = await this.getReportById(reportId);
        this.reportEngage = await this.getReportEngage(reportId);
        this.assignedMaintainer = await this.getAssignedMaintainer(
          this.reportEngage.maintainerId
        );
        await this.getAllReportStatus(reportId);
        this.postponeDetail.description = this.activateStatus[0].detail;
        if (
          this.reportDetail.reportId != "" &&
          this.reportEngage.engageid != "" &&
          this.assignedMaintainer.maintainerId != "" &&
          this.activateStatus.length > 0
        ) {
          this.noData = false;
        } else {
          this.noData = true;
        }
        this.loadingData = false;
        this.filterSelectedDate();
      }
    },
    async getReportById(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/report/detail/${reportId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
    async getReportEngage(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/reportEnagegFixDate/detail/${reportId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
    async getAssignedMaintainer(maintainerId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/maintainerById/${maintainerId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
    async getAllReportStatus(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/reportStatus/detail/${reportId}`,
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
        this.activateStatus = data;
        for (let i in this.activateStatus) {
          for (let j in this.statusList) {
            if (this.activateStatus[i].status == this.statusList[j].id) {
              this.activateStatus[i].th = this.statusList[j].name;
            }
          }
          this.activateStatus[i].isActive = true;
          this.activateStatus[i].divider = true;
          this.activateStatus[0].divider = false;
        }
      });
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
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
    filterCategory(category) {
      for (let i in this.categoryLists) {
        if (this.categoryLists[i].engName == category) {
          return this.categoryLists[i].name;
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
    splitTime(datetime) {
      if (datetime == "") {
        return "";
      }
      const res = datetime.split("T");
      const timeRes = res[1].split("Z");
      const showTime = timeRes[0].slice(0, -6);
      const showTime2 = parseInt(showTime) + 1;
      const start = timeRes[0].slice(0, -3);
      const end = this.pad(showTime2) + ":00";
      return start + " - " + end;
    },
    previewImage(image) {
      this.modalbg = true;
      this.showImage = true;
      this.image = `${process.env.VUE_APP_API_URL}/download_report_image/${image}`;
    },
    splitDateOg(datetime) {
      return datetime.split("T")[0];
    },
    setUpperFloor(datetime) {
      const res = datetime.split("-");
      return `${res[0]}-${res[1]}-${this.pad(parseInt(res[2]) + 1)}`;
    },
  },
};
</script>

<style></style>
