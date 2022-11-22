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
      <div class="text-xl">รายละเอียดและสถานะ</div>
    </div>
    <hr class="my-5 border-rangmod-purple" />

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
        :class="openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '"
      >
        <div
          class="z-10 md:px-16 mb-10 w-full"
          :class="
            openReportStatus
              ? 'delay-250 transition-all duration-200 max-h-min h-fit delay-150'
              : 'opacity-0 max-h-[0vh]'
          "
        >
          <div
            class="z-10 w-full"
            :class="
              openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '
            "
          >
            <div
              class="z-10 flex flex-row justify-center my-10 items-center w-full"
              :class="
                openReportStatus ? 'max-h-min h-fit delay-150' : 'max-h-[0vh] '
              "
            >
              <div
                v-if="statusIsCancel1 || statusIsCancel2"
                class="z-10 items-center rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-red bg-rangmod-stat-light-red"
                :class="
                  openReportStatus
                    ? 'max-h-min h-fit delay-150'
                    : 'max-h-[0vh] '
                "
              >
                <div
                  class="z-10 items-center w-full h-full flex flex-col justify-center"
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
                v-else
                class="z-10 items-center rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-yellow bg-rangmod-stat-light-yellow"
                :class="
                  openReportStatus
                    ? 'max-h-min h-fit delay-150'
                    : 'max-h-[0vh] '
                "
              >
                <div
                  class="z-10 items-center w-full h-full flex flex-col justify-center"
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
                v-if="statusIsCancel1 || statusIsCancel2"
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3 bg-rangmod-stat-red"
              ></div>
              <div
                v-else
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                :class="
                  statusIsPrepare
                    ? 'bg-rangmod-stat-yellow'
                    : 'bg-rangmod-stat-gray'
                "
              ></div>
              <div
                v-if="statusIsCancel1 || statusIsCancel2"
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-red bg-rangmod-stat-light-red"
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    v-if="statusIsCancel2"
                    src="@/assets/images/success.png"
                    class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                  />
                  <img
                    v-else
                    src="@/assets/images/cancelled.png"
                    class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                  />
                </div>
                <div
                  v-if="statusIsCancel2"
                  class="text-base font-primary text-center mt-2 hidden ssm:block"
                >
                  รับเรื่อง
                </div>
                <div
                  v-else
                  class="text-base font-primary text-center mt-2 hidden ssm:block"
                >
                  ยกเลิก
                </div>
              </div>
              <div
                v-else
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                :class="
                  statusIsPrepare
                    ? 'border-rangmod-stat-yellow bg-rangmod-stat-light-yellow'
                    : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                "
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    v-if="statusIsPrepare"
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
                v-if="statusIsCancel2"
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3 bg-rangmod-stat-red"
              ></div>
              <div
                v-else
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                :class="
                  statusIsPrepare
                    ? 'bg-rangmod-stat-yellow'
                    : 'bg-rangmod-stat-gray'
                "
              ></div>
              <div
                v-if="statusIsCancel2"
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-red bg-rangmod-stat-light-red"
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    src="@/assets/images/sand.png"
                    class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                  />
                </div>
                <div
                  v-if="statusIsCancel2"
                  class="text-base font-primary text-center mt-2 hidden ssm:block"
                >
                  รอดำเนินการ
                </div>
                <div
                  v-else
                  class="text-base font-primary text-center mt-2 hidden ssm:block"
                >
                  ยกเลิก
                </div>
              </div>
              <div
                v-else
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                :class="
                  statusIsPrepare
                    ? 'border-rangmod-stat-yellow bg-rangmod-stat-light-yellow'
                    : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                "
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    v-if="statusIsPrepare"
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
                v-if="statusIsCancel2"
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3 bg-rangmod-stat-red"
              ></div>
              <div
                v-else
                class="ssm:h-2 ssm:w-10 md:w-20 h-1 w-3"
                :class="
                  statusIsFinish
                    ? 'bg-rangmod-stat-yellow'
                    : 'bg-rangmod-stat-gray'
                "
              ></div>
              <div
                v-if="statusIsCancel2"
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2 border-rangmod-stat-red bg-rangmod-stat-light-red"
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    v-if="statusIsCancel2"
                    src="@/assets/images/cancelled.png"
                    class="ssm:h-12 ssm:w-12 md:h-16 md:w-16 mx-auto h-6 w-6"
                  />
                </div>
                <div
                  class="text-base font-primary text-center mt-2 hidden ssm:block"
                >
                  ยกเลิก
                </div>
              </div>
              <div
                v-else
                class="rounded-full ssm:h-20 ssm:w-20 md:h-24 md:w-24 h-12 w-12 border-2"
                :class="
                  statusIsFinish
                    ? 'border-rangmod-stat-green bg-rangmod-stat-light-green'
                    : 'border-rangmod-stat-gray bg-rangmod-stat-light-gray'
                "
              >
                <div
                  class="items-center w-full h-full flex flex-col justify-center"
                >
                  <img
                    v-if="statusIsFinish"
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
    <!-- <RepairForm :report="reportById"/> -->
    <div class="ssm:mx-16 mx-0">
      <div class="flex lg:flex-row flex-col-reverse lg:justify-between mb-6">
        <div class="w-full flex lg:justify-start justify-center">
          <div class="flex flex-col justify-start md:w-4/5 w-full">
            <div class="pr-0">
              <div class="text-rangmod-black ml-1">ประเภทปัญหา</div>
              <div class="mb-5 relative">
                <div
                  @click="openReportCategory = !openReportCategory"
                  class="w-full bg-white border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-between cursor-pointer items-center"
                >
                  <div
                    v-if="hasNewCategory"
                    class="cursor-pointer flex flex-row"
                  >
                    <div class="cursor-pointer">
                      {{ filterCategory(newCategory.engName) }}
                    </div>
                    <div
                      class="text-rangmod-gray text-sm my-auto mx-2 cursor-pointer"
                    >
                      (แก้ไข)
                    </div>
                  </div>
                  <div v-else class="cursor-pointer">
                    {{ filterCategory(reportDetail.categoriesReport) }}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
                    viewBox="0 0 16 16"
                    :class="
                      openReportCategory
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
                  class="w-full absolute flex flex-col"
                  :class="
                    openReportCategory
                      ? 'py-2 px-4 transition-all max-h-min h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray'
                      : 'max-h-[0vh]'
                  "
                >
                  <div
                    v-for="(cat, i) in categoryLists"
                    :key="i"
                    class="w-full flex justify-end"
                    :class="
                      openReportCategory
                        ? ' max-h-min h-fit hover:font-bold cursor-pointer'
                        : 'max-h-[0vh]'
                    "
                  >
                    <div
                      @click="
                        (newCategory = cat),
                          (hasNewCategory =
                            reportDetail.categoriesReport != cat.engName
                              ? true
                              : false),
                          (openReportCategory = false)
                      "
                      :class="
                        openReportCategory
                          ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                          : 'opacity-0 max-h-[0vh]'
                      "
                    >
                      {{ cat.name }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-rangmod-black ml-1">หัวข้อปัญหา</div>
              <div class="mb-5">
                <div
                  class="min-w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider truncate max-w-max"
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
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path
                      d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div v-if="this.reportDetail.status == 'R1'" class="flex flex-col">
              <div v-for="i in 4" :key="i">
                <div class="mb-4">
                  <div v-if="i == 1" class="text-rangmod-black ml-1">
                    วันและเวลาที่นัด
                  </div>
                  <div v-else class="text-rangmod-black ml-1">
                    วันและเวลา ({{ i }})
                  </div>
                  <div class="flex flex-col">
                    <div
                      class="flex flex-col xse:flex-row xse:space-x-2 space-y-2 xse:space-y-0 xse:justify-between"
                    >
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
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

            <div v-else class="flex flex-col ssm:mr-0 mr-10">
              <div v-for="(date, i) in reportEngage.fixDate" :key="i">
                <div class="mb-4">
                  <div v-if="i == 0" class="text-rangmod-black ml-1">
                    วันและเวลาที่นัด
                  </div>
                  <div v-else class="text-rangmod-black ml-1">
                    วันและเวลา ({{ i + 1 }})
                  </div>
                  <div class="flex flex-col">
                    <div
                      class="flex flex-col xse:flex-row xse:space-x-2 space-y-2 xse:space-y-0 xse:justify-between"
                    >
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(date.date) }}
                        </div>
                      </div>
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">
                          เวลาเริ่มต้น - สิ้นสุด
                        </div>
                        <div class="flex flex-row relative">
                          <div
                            class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          >
                            {{ splitTime(date.date) }}
                          </div>
                          <div
                            v-if="reportDetail.status != 'S7'"
                            class="flex flex-col justify-center h-full absolute -right-10"
                          >
                            <div
                              v-if="checkSelectedDate(date)"
                              class="my-auto w-7 h-7 p-2 rounded-full bg-rangmod-green border-[3px] border-rangmod-selected-green shadow-2xl"
                            ></div>
                            <div
                              v-else
                              @click="selectEngageDate(date)"
                              class="my-auto w-7 h-7 p-2 rounded-full bg-white border-[3px] border-rangmod-selected-gray shadow-2xl hover:border-rangmod-selected-green cursor-pointer"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex lg:justify-end justify-center">
          <div
            class="flex flex-col space-y-8 md:h-fit h-full md:w-4/5 w-full mb-6"
          >
            <div
              class="border border-rangmod-purple rounded-3xl h-full xse-2:px-10 px-5 w-full"
            >
              <div class="flex flex-col justify-start w-full">
                <div class="flex flex-row justify-between items-center">
                  <div class="text-rangmod-purple my-5">ข้อมูลช่าง</div>
                  <div v-if="!isCancel">
                    <div
                      v-if="!isEdit"
                      @click="isEdit = !isEdit"
                      class="w-fit h-fit cursor-pointer transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-edit-3 text-rangmod-light-yellow hover:stroke-[3]"
                      >
                        <path d="M12 20h9"></path>
                        <path
                          d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                        ></path>
                      </svg>
                    </div>
                    <div v-else class="flex flex-row justify-end space-x-4">
                      <div
                        @click="isEdit = !isEdit"
                        class="w-fit h-fit cursor-pointer transition-all items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="bi bi-save text-rangmod-light-red items-center hover:stroke-[1.5]"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </div>
                      <div
                        @click="addMaintainer()"
                        class="w-fit h-fit cursor-pointer transition-all items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="bi bi-save text-rangmod-green items-center hover:stroke-[1.5]"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full flex flex-row mx-auto relative">
                  <div
                    class="mb-5 w-full flex flex-col ssm-3:flex-row ssm-3:space-x-2 space-y-1 ssm-3:space-y-0 relative"
                  >
                    <div class="w-full">
                      <div class="text-rangmod-black ml-1">ชื่อ</div>
                      <div class="">
                        <div
                          v-if="!isEdit"
                          class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                        >
                          <div class="truncate max-w-full min-w-full">
                            {{ selectedMaintainer.fname }}
                          </div>
                        </div>
                        <input
                          v-else
                          v-model="maintainer.fname"
                          type="text"
                          class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-white"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <div class="text-rangmod-black ml-1">นามสกุล</div>
                      <div class="">
                        <div
                          v-if="!isEdit"
                          class="flex justify-between items-center truncate w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                        >
                          <div class="truncate min-w-max">
                            {{ selectedMaintainer.lname }}
                          </div>
                        </div>
                        <input
                          v-else
                          v-model="maintainer.lname"
                          type="text"
                          class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-full absolute flex flex-col mt-16"
                    :class="
                      openMaintainer
                        ? 'py-2 px-4 transition-all max-h-60 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
                        : 'max-h-[0vh]'
                    "
                  >
                    <div
                      v-for="(mtn, i) in maintainerLists"
                      :key="i"
                      class="w-full flex justify-end"
                      :class="
                        openMaintainer
                          ? ' max-h-60 h-fit hover:font-bold cursor-pointer'
                          : 'max-h-[0vh]'
                      "
                    >
                      <div
                        @click="
                          (selectedMaintainer = mtn), (openMaintainer = false)
                        "
                        :class="
                          openMaintainer
                            ? 'transition-all w-full max-h-60 h-fit py-2 text-right'
                            : 'opacity-0 max-h-[0vh]'
                        "
                      >
                        {{ mtn.fname }} {{ mtn.lname }}
                      </div>
                    </div>
                  </div>
                  <div class="w-fit ml-2" v-if="!isEdit">
                    <div class="text-rangmod-black ml-1">&nbsp;</div>
                    <div class="">
                      <div
                        @click="openMaintainer = !openMaintainer"
                        class="w-fit h-fit cursor-pointer transition-all items-center hover:shadow-lg rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 512 512"
                          class="text-rangmod-light-purple-2 transition-all rounded-full"
                          :class="openMaintainer ? 'rotate-180' : ''"
                        >
                          <path
                            d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 246.6l-112 112C272.4 364.9 264.2 368 256 368s-16.38-3.125-22.62-9.375l-112-112c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L256 290.8l89.38-89.38c12.5-12.5 32.75-12.5 45.25 0S403.1 234.1 390.6 246.6z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="w-full absolute flex flex-col mt-16"
                    :class="
                      openMaintainer
                        ? 'py-2 px-4 transition-all max-h-60 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
                        : 'max-h-[0vh]'
                    "
                  >
                    <div
                      v-for="(mtn, i) in maintainerLists"
                      :key="i"
                      class="w-full flex justify-end"
                      :class="
                        openMaintainer
                          ? ' max-h-60 h-fit hover:font-bold cursor-pointer'
                          : 'max-h-[0vh]'
                      "
                    >
                      <div
                        @click="
                          (selectedMaintainer = mtn), (openMaintainer = false)
                        "
                        :class="
                          openMaintainer
                            ? 'transition-all w-full max-h-60 h-fit py-2 text-right'
                            : 'opacity-0 max-h-[0vh]'
                        "
                      >
                        {{ mtn.fname }} {{ mtn.lname }}
                      </div>
                    </div>
                  </div> -->
                </div>
                <div class="text-rangmod-black ml-1">เบอร์ติดต่อช่าง</div>
                <div class="mb-5">
                  <div
                    v-if="!isEdit"
                    class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                  >
                    <div>
                      {{ selectedMaintainer.phone }}
                    </div>
                  </div>
                  <input
                    v-else
                    v-model="maintainer.phone"
                    type="text"
                    maxlength="10"
                    class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-white"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="hasReject || this.reportDetail.status == 'R1'"
              class="border border-rangmod-purple bg-rangmod-light-pink rounded-3xl xse-2:px-10 px-5 w-full h-[440px] overflow-y-scroll no-scrollbar"
            >
              <div
                v-if="this.reportDetail.status == 'R1'"
                class="flex flex-col justify-start w-full mb-5"
              >
                <div class="flex flex-row justify-start">
                  <div class="text-rangmod-purple text-xl my-5">
                    ขอเปลี่ยนวันนัด
                  </div>
                </div>

                <div class="w-full">
                  <div class="text-rangmod-black ml-1">เหตุผล</div>
                  <div class="mb-5">
                    <textarea
                      v-model="activateStatus[0].detail"
                      class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                      readonly
                    ></textarea>
                  </div>
                </div>
                <div class="text-rangmod-black ml-1">ช่วงเวลาที่ขอเปลี่ยน</div>
                <div class="flex flex-col">
                  <div v-for="(engage, i) in reportEngage.fixDate" :key="i">
                    <div class="mb-3">
                      <div class="flex flex-col">
                        <div class="flex flex-row space-x-2 justify-between">
                          <div class="flex flex-col w-full">
                            <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                            <div
                              class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                            >
                              {{ splitDate(engage.date) }}
                            </div>
                          </div>
                          <div class="flex flex-col w-full">
                            <div class="text-rangmod-black ml-1">ช่วงเวลา</div>
                            <div class="flex flex-row relative">
                              <div
                                class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                              >
                                {{ filterPeriod(engage.period) }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col justify-start w-full mb-5">
                <div class="flex flex-row justify-between">
                  <div class="text-rangmod-purple text-xl my-5">
                    ขอเปลี่ยนวันนัด
                  </div>
                  <div class="flex justify-end my-5">
                    <div
                      @click="
                        (hasReject = !hasReject),
                          closePostpone(),
                          clearPostpone()
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
                </div>

                <div class="w-full">
                  <div class="text-rangmod-black ml-1">เหตุผล</div>
                  <div class="mb-5">
                    <textarea
                      v-model="this.postponeDetail.description"
                      class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                      readonly
                    ></textarea>
                  </div>
                </div>
                <div class="text-rangmod-black ml-1">ช่วงเวลาที่ขอเปลี่ยน</div>
                <div class="flex flex-col">
                  <div
                    v-for="(engage, i) in postponeDetail.newEngageDate"
                    :key="i"
                  >
                    <div class="mb-3">
                      <div class="flex flex-col">
                        <div class="flex flex-row space-x-2 justify-between">
                          <div class="flex flex-col w-full">
                            <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                            <div
                              class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                            >
                              {{ splitDate(engage.date) }}
                            </div>
                          </div>
                          <div class="flex flex-col w-full">
                            <div class="text-rangmod-black ml-1">ช่วงเวลา</div>
                            <div class="flex flex-row relative">
                              <div
                                class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                              >
                                {{ engage.selectedPeriod.th }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="this.reportDetail.status != 'S7'"
        class="flex justify-end space-x-4"
      >
        <div
          v-if="reportDetail.status != 'S9'"
          @click="openPostpone()"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-ppbtn-blue shadow-xl cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-ppbtn-blue hover:text-rangmod-ppbtn-blue hover:shadow-none"
        >
          ขอเปลี่ยนวันนัด
        </div>

        <div
          v-if="this.reportDetail.status == 'S9'"
          @click="actionButton('cancel')"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-red shadow-xl cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-red hover:text-rangmod-red hover:shadow-none"
        >
          ยกเลิกนัด
        </div>

        <div
          v-if="reportDetail.status != 'S9'"
          @click="(saveModal = true), (modalbg = true)"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-purple shadow-xl cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
        >
          บันทึก
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
          class="w-[440px] h-[440px] mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
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
            <div class="w-80 h-80 z-[150] mx-auto flex flex-col justify-center">
              <img :src="this.image" class="" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-[600px] mx-auto my-10 bg-white ssm:px-5 px-0 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end mr-5 ssm:mr-0">
            <div @click="closePostpone()" class="cursor-pointer">
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
            <div class="">
              <div class="flex flex-col justify-start w-full">
                <div class="text-rangmod-purple text-xl my-5">
                  ขอเปลี่ยนวันนัด
                </div>
                <div class="w-full">
                  <div class="text-rangmod-black ml-1">เหตุผล</div>
                  <div class="mb-5">
                    <textarea
                      v-model="this.postponeDetail.description"
                      class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    ></textarea>
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="text-rangmod-black ml-1">
                    จำนวนช่วงเวลาที่ขอเปลี่ยน
                  </div>
                  <div
                    v-if="countPostponeDate == 7"
                    class="text-rangmod-red ml-1"
                  >
                    *จำนวนวันสูงสุดแล้ว
                  </div>
                </div>
                <div class="ssm:w-3/5 w-full">
                  <div class="mb-5 flex flex-row space-x-2">
                    <input
                      v-model="countPostponeDate"
                      type="number"
                      class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                      readonly
                    />
                    <div
                      @click="delDate()"
                      class="cursor-pointer items-center my-auto transition-all hover:text-rangmod-purple text-rangmod-gray"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-dash-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                        />
                      </svg>
                    </div>
                    <div
                      @click="addDate()"
                      class="cursor-pointer items-center my-auto transition-all hover:text-rangmod-purple text-rangmod-gray"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-plus-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    v-for="(engage, i) in postponeDetail.newEngageDate"
                    :key="i"
                  >
                    <div class="mb-3">
                      <div class="flex flex-row">
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          class="text-rangmod-red ml-1"
                          :class="engage.require ? '' : 'hidden'"
                        >
                          *
                        </div>
                      </div>

                      <div class="flex flex-col ssm:flex-row ssm:space-x-2 ssm:space-y-0 space-y-2 justify-between">
                        <div class="flex flex-col w-full">
                          <input
                            v-model="engage.date"
                            type="date"
                            class="w-full border bg-white border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          />
                        </div>
                        <div
                          class="flex flex-row ssm:space-x-2 space-x-4 w-full items-center"
                        >
                          <div
                            v-for="(period, i) in engage.period.dayPeriod"
                            :key="i"
                            class=""
                          >
                            <div
                              @click="engage.selectedPeriod = period"
                              class="items-center my-auto flex flex-row cursor-pointer"
                            >
                              <div
                                class="w-4 h-4 border-2 border-rangmod-gray rounded-full hover:border-rangmod-green"
                                :class="
                                  period.id == engage.selectedPeriod.id
                                    ? 'bg-rangmod-green'
                                    : 'bg-white'
                                "
                              ></div>
                              <div class="ml-1">
                                {{ period.th }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row space-x-4 justify-end">
              <div
                v-on:click=" checkReject(),
                  (hasReject = true), (modalbg = false), (showModal = false)
                "
                class="w-32 my-2 py-2 text-base rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-show="saveModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || sentEngage || sentPostpone"
          class="bg-black fixed inset-0 opacity-60 visible z-[90]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-[600px] mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div
              @click="(saveModal = !saveModal), (modalbg = false)"
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
          <div class="flex flex-col justify-between h-full">
            <div v-if="!hasReject" class="flex flex-col">
              <div class="text-rangmod-font-purple text-xl font-bold my-5 px-5">
                ตรวจสอบข้อมูล
              </div>
              <div
                class="flex flex-col px-5 border border-rangmod-purple rounded-3xl divide-y divide-rangmod-light-purple"
              >
                <div class="flex flex-col w-full pb-5">
                  <div
                    class="text-rangmod-font-light-purple text-xl my-5 flex flex-row items-center"
                  >
                    <div>ประเภทปัญหา</div>
                    <div
                      v-if="hasNewCategory"
                      class="text-rangmod-font-light-gray text-sm ml-2"
                    >
                      (มีการแก้ไข)
                    </div>
                  </div>
                  <div v-if="hasNewCategory" class="w-full mx-2 flex flex-row">
                    <div class="text-rangmod-font-gray ml-1">
                      {{ filterCategory(reportDetail.categoriesReport) }}
                    </div>
                    <div class="text-rangmod-font-gray items-center mx-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-chevrons-right"
                      >
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                      </svg>
                    </div>
                    <div class="text-rangmod-black ml-1">
                      {{ filterCategory(newCategory.engName) }}
                    </div>
                  </div>
                  <div v-else class="w-full mx-2">
                    <div class="text-rangmod-black ml-1">
                      {{ filterCategory(reportDetail.categoriesReport) }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-full pb-5">
                  <div
                    class="text-rangmod-font-light-purple text-xl my-5 flex flex-row items-center"
                  >
                    <div>วันที่ทำการเข้าซ่อม</div>
                    <div
                      v-if="selectedFixDate.id != 0"
                      class="text-rangmod-font-light-gray text-sm ml-2"
                    >
                      (มีการแก้ไข)
                    </div>
                  </div>
                  <div
                    v-if="selectedFixDate.id != 0 && currentFixDate != ''"
                    class="w-fit mx-2 flex flex-col"
                  >
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-font-gray ml-1">ว/ด/ป</div>
                        <div
                          class="w-fit text-rangmod-font-gray bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(currentFixDate) }}
                        </div>
                      </div>
                      <div>
                        <div class="text-rangmod-font-gray ml-1">เวลา</div>
                        <div
                          class="w-fit text-rangmod-font-gray bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitTime(currentFixDate) }}
                        </div>
                      </div>
                    </div>
                    <div class="text-rangmod-font-gray my-2 w-fit ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-chevrons-right rotate-90"
                      >
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                      </svg>
                    </div>
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(selectedFixDate.date) }}
                        </div>
                      </div>
                      <div>
                        <div class="text-rangmod-black ml-1">เวลา</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitTime(selectedFixDate.date) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="currentFixDate == '' && selectedFixDate.id != 0"
                  >
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(selectedFixDate.date) }}
                        </div>
                      </div>
                      <div>
                        <div class="text-rangmod-black ml-1">เวลา</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitTime(selectedFixDate.date) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitDate(currentFixDate) }}
                        </div>
                      </div>
                      <div>
                        <div class="text-rangmod-black ml-1">เวลา</div>
                        <div
                          class="w-fit bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                        >
                          {{ splitTime(currentFixDate) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-full pb-5">
                  <div
                    class="text-rangmod-font-light-purple text-xl my-5 flex flex-row items-center"
                  >
                    <div>ข้อมูลช่างซ่อม</div>
                    <div
                      v-if="selectedMaintainer.id != 0"
                      class="text-rangmod-font-light-gray text-sm ml-2"
                    >
                      (มีการแก้ไข)
                    </div>
                  </div>
                  <div
                    v-if="selectedMaintainer.id != 0"
                    class="w-fit mx-2 flex flex-col"
                  >
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-font-gray ml-1">
                          ชื่อ - นามสกุล : {{ currentMtn.fname }}
                          {{ currentMtn.lname }}
                        </div>
                        <div class="text-rangmod-font-gray ml-1">
                          เบอร์ติดต่อ : {{ currentMtn.phone }}
                        </div>
                      </div>
                    </div>
                    <div class="text-rangmod-font-gray my-2 w-fit ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-chevrons-right rotate-90"
                      >
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                      </svg>
                    </div>
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-black ml-1">
                          ชื่อ - นามสกุล : {{ selectedMaintainer.fname }}
                          {{ selectedMaintainer.lname }}
                        </div>
                        <div class="text-rangmod-black ml-1">
                          เบอร์ติดต่อ : {{ selectedMaintainer.phone }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="w-fit mx-2 flex flex-col">
                    <div class="flex flex-row space-x-2 w-fit">
                      <div>
                        <div class="text-rangmod-black ml-1">
                          ชื่อ - นามสกุล : {{ currentMtn.fname }}
                          {{ currentMtn.lname }}
                        </div>
                        <div class="text-rangmod-black ml-1">
                          เบอร์ติดต่อ : {{ selectedMaintainer.phone }}
                        </div>
                      </div>
                    </div>
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
                v-if="sentEngage"
                class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
              >
                <div
                  class="text-rangmod-green items-center bg-white rounded-full"
                >
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

            <div v-if="hasReject" class="flex flex-col">
              <div class="flex flex-col w-full">
                <div class="text-rangmod-purple text-xl my-5">
                  ขอเปลี่ยนวันนัด
                </div>
                <div class="mb-5">
                  <textarea
                    v-model="this.postponeDetail.description"
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    readonly
                  ></textarea>
                </div>
              </div>
              <div class="text-rangmod-black ml-1">ช่วงเวลาที่ขอเปลี่ยน</div>
              <div class="flex flex-col">
                <div
                  v-for="(engage, i) in postponeDetail.newEngageDate"
                  :key="i"
                >
                  <div class="mb-3">
                    <div class="flex flex-col">
                      <div class="flex flex-row space-x-2 justify-between">
                        <div class="flex flex-col w-full">
                          <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                          <div
                            class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          >
                            {{ splitDate(engage.date) }}
                          </div>
                        </div>
                        <div class="flex flex-col w-full">
                          <div class="text-rangmod-black ml-1">ช่วงเวลา</div>
                          <div class="flex flex-row relative">
                            <div
                              class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                            >
                              {{ engage.selectedPeriod.th }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row space-x-4 mb-5 justify-end">
              <div
                v-on:click="
                  hasReject ? actionButton('reject') : actionButton('accept')
                "
                class="w-32 my-2 py-2 text-base rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
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
              v-if="sentEngage || sentPostpone"
              class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
            >
              <div
                class="text-rangmod-green items-center bg-white rounded-full"
              >
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
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      empId: localStorage.getItem("id"),
      showImage: false,
      loading: false,
      sentEngage: false,
      sentPostpone: false,
      showModal: false,
      saveModal: false,
      modalbg: false,
      addedMaintainer: false,
      showPostponeDetail: false,
      isEdit: false,
      hasReject: false,
      openReportStatus: false,
      openReportCategory: false,
      openMaintainer: false,
      hasNewCategory: false,
      newCategory: {},
      reportDetail: {},
      reportEngage: {},
      maintainerLists: [],
      currentMtn: {},
      maintainer: {
        id: 0,
        fname: "",
        lname: "",
        phone: "",
      },
      ivlMaintainer: {
        fname: false,
        lname: false,
        phone: false,
      },
      postponeDetail: {
        description: "",
        newEngageDate: [
          {
            title: "date1",
            date: "",
            require: true,
            selectedPeriod: 0,
            period: {
              dayPeriod: [
                {
                  id: 1,
                  eng: "AM",
                  th: "เช้า",
                  isActive: false,
                },
                {
                  id: 2,
                  eng: "PM",
                  th: "บ่าย",
                  isActive: false,
                },
                {
                  id: 3,
                  eng: "ALL",
                  th: "ทั้งวัน",
                  isActive: false,
                },
              ],
            },
          },
          {
            title: "date2",
            date: "",
            require: true,
            selectedPeriod: 0,
            period: {
              dayPeriod: [
                {
                  id: 1,
                  eng: "AM",
                  th: "เช้า",
                  isActive: false,
                },
                {
                  id: 2,
                  eng: "PM",
                  th: "บ่าย",
                  isActive: false,
                },
                {
                  id: 3,
                  eng: "ALL",
                  th: "ทั้งวัน",
                  isActive: false,
                },
              ],
            },
          },
          {
            title: "date3",
            date: "",
            require: true,
            selectedPeriod: 0,
            period: {
              dayPeriod: [
                {
                  id: 1,
                  eng: "AM",
                  th: "เช้า",
                  isActive: false,
                },
                {
                  id: 2,
                  eng: "PM",
                  th: "บ่าย",
                  isActive: false,
                },
                {
                  id: 3,
                  eng: "ALL",
                  th: "ทั้งวัน",
                  isActive: false,
                },
              ],
            },
          },
        ],
      },
      defaultPostponeDetail: {},
      selectedMaintainer: {},
      assignedMaintainer: {},
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
          name: "รอยืนยันวันนัดซ่อม",
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
      activateStatus: [],
      reportEngageDate: [
        {
          id: 1,
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "09:00 - 10:00",
          datetime: "",
          isActive: false,
        },
        {
          id: 2,
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "10:00 - 11:00",
          datetime: "",
          isActive: false,
        },
        {
          id: 3,
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "11:00 - 12:00",
          datetime: "",
          isActive: false,
        },
        {
          id: 4,
          date: "",
          ogdate: "04/11/2565",
          time: "",
          ogtime: "12:00 - 13:00",
          datetime: "",
          isActive: false,
        },
      ],
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
      popupDetail: [],
      selectedFixDate: {
        id: 0,
      },
      currentFixDate: "",
      allStatus: [],
    };
  },
  computed: {
    countPostponeDate() {
      const newDate = this.postponeDetail.newEngageDate;
      return newDate.length;
    },
    isCancel() {
      return (
        this.reportDetail.status == "S6" || this.reportDetail.status == "S9"
      );
    },
    statusIsPrepare() {
      return this.allStatus.includes("S4");
    },
    statusIsPostpone() {
      return this.allStatus.includes("R1");
    },
    statusIsFinish() {
      return this.allStatus.includes("S7");
    },
    statusIsCancel1() {
      return this.allStatus.includes("S6") && this.allStatus.includes("S1");
    },
    statusIsCancel2() {
      return this.allStatus.includes("S6") && this.allStatus.includes("S4");
    },
  },
  mounted() {
    this.create();
  },
  methods: {
    checkReject() {},
    async create() {
      this.reportDetail = await this.getReportById(this.$route.params.id);
      this.reportEngage = await this.getReportEngage(this.$route.params.id);
      // console.log(this.reportDetail);
      console.log(this.reportEngage);
      this.currentFixDate = this.getSelectedFixDate(
        this.reportEngage.selectedDate
      );
      console.log(this.currentFixDate);
      await this.getAllReportStatus(this.$route.params.id);
      console.log(this.statusIsPrepare);
      console.log(this.allStatus);
      this.maintainerLists = await this.getMaintainer();
      this.selectedMaintainer =
        this.reportEngage.maintainerId == ""
          ? this.maintainerLists[0]
          : await this.getAssignedMaintainer(this.reportEngage.maintainerId);
      this.currentMtn = structuredClone(this.selectedMaintainer);
      this.defaultPostponeDetail = structuredClone(this.postponeDetail);
    },
    getSelectedFixDate(date) {
      for (let i in this.reportEngage.fixDate) {
        if (this.reportEngage.fixDate[i].id == date) {
          return this.reportEngage.fixDate[i].date;
        }
      }
      return "";
    },
    checkSelectedDate(date) {
      if (this.reportEngage.selectedDate == date.id) {
        return true;
      }
      if (this.selectedFixDate.id != 0) {
        return date.id == this.selectedFixDate.id;
      } else {
        return false;
      }
    },
    async getReportById(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/report/detail/${reportId}`,
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
        `${process.env.VUE_APP_API_URL}/employee/reportEnagegFixDate/detail/${reportId}`,
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
        `${process.env.VUE_APP_API_URL}/service/maintainerById/${maintainerId}`,
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
    async addMaintainer() {
      this.ivlMaintainer.fname = this.maintainer.fname == "";
      this.ivlMaintainer.lname = this.maintainer.lname == "";
      this.ivlMaintainer.phone = this.maintainer.phone == "";
      if (
        this.ivlMaintainer.fname ||
        this.ivlMaintainer.lname ||
        this.ivlMaintainer.phone
      ) {
        setTimeout(() => {
          this.ivlMaintainer.fname = false;
          this.ivlMaintainer.lname = false;
          this.ivlMaintainer.phone = false;
        }, 2000);
      } else {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/maintainer`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              Fname: this.maintainer.fname,
              Lname: this.maintainer.lname,
              Phone: this.maintainer.phone,
              UpdateBy: parseInt(this.empId),
            }),
          }
        );
        const data = res.json();
        return data.then(async (data) => {
          if (data.message == "success") {
            const res2 = await fetch(
              `${process.env.VUE_APP_API_URL}/service/maintainerById/${data.maintainerId}`,
              {
                method: "GET",
                headers: {
                  "content-Type": "application/json",
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            const data2 = res2.json();
            return data2.then((data2) => {
              if (data2.maintainerId != 0) {
                this.maintainerLists.push(data2);
                this.selectedMaintainer = data2;
                this.addedMaintainer = true;
                setTimeout(() => {
                  this.addedMaintainer = false;
                  this.isEdit = !this.isEdit;
                }, 1000);
              }
            });
          }
        });
      }
    },
    async getMaintainer() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/maintainerList`,
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
        if (data != null) {
          return data;
        }
      });
    },
    async assignMaintainer(maintainer) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/assignFixReport`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            engageId: parseInt(this.reportEngage.engageId),
            maintainerId: maintainer.maintainerId,
            updateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json();
      return data;
      // return data.then((data) => {
      //   if (data.message == "success") {
      //     return "success";
      //   } else {
      //     return "fail";
      //   }
      // });
    },
    async actionButton(action) {
      if (action == "accept") {
        this.modalbg = false;
        this.loading = true;
        if (this.hasNewCategory) {
          const res3 = await this.changeCategory(this.newCategory.engName);
          if (res3.message == "success") {
            this.loading = false;
            this.sentEngage = true;
            setTimeout(() => {
              this.sentEngage = false;
            }, 1500);
            setTimeout(async () => {
              this.saveModal = false;
              this.hasNewCategory = false;
              await this.reloadData();
            }, 2500);
          }
          console.log(res3);
        }
        if (
          this.selectedMaintainer.id != this.currentMtn.maintainerId &&
          this.selectedFixDate
        ) {
          const res2 = await this.assignMaintainer(this.selectedMaintainer);
          if (res2.message == "success") {
            this.loading = false;
            this.sentEngage = true;
            setTimeout(() => {
              this.sentEngage = false;
            }, 1500);
            setTimeout(async () => {
              this.saveModal = false;
              this.hasNewCategory = false;
              await this.reloadData();
            }, 2500);
          }
          console.log(res2);
        }
        if (this.selectedMaintainer.id != 0 && this.selectedFixDate.id != 0) {
          const res1 = await this.selectPlanFixDate(this.selectedFixDate.id);
          const res2 = await this.assignMaintainer(this.selectedMaintainer);
          console.log(res1.message);
          console.log(res2.message);
          if (res1.message == "success" && res2.message == "success") {
            await this.updateStatus("S4", "").then(async (res) => {
              console.log(res);
              if (res == "success") {
                this.loading = false;
                this.sentEngage = true;
                setTimeout(() => {
                  this.sentEngage = false;
                }, 1500);
                setTimeout(async () => {
                  this.saveModal = false;
                  this.hasNewCategory = false;
                  await this.reloadData();
                }, 2500);
              }
            });
          }
        }
      }

      if (action == "cancel") {
        await this.updateStatus("S6", "").then(async () => {
          this.reloadData();
          this.modalbg = false;
        });
      }

      if (action == "delete") {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/deleteReportById`,
          {
            method: "DELETE",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: this.reportDetail.reportId,
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          if (data.message == "success") {
            this.isDelete = true;
            setTimeout(() => {
              this.isDelete = false;
            }, 2000);
            setTimeout(() => {
              this.$router.push(`/dashboard/report`);
            }, 2500);
          } else {
            return "fail";
          }
        });
      }

      if (action == "reject") {
        this.modalbg = false;
        this.loading = true;
        const dates = this.filterNewEngage(this.postponeDetail);
        const res = await this.postponeEngage(dates);
        console.log(res);
        if (res.message == "success") {
          const resStatus = await this.updateStatus(
            "R1",
            this.postponeDetail.description
          );
          if (resStatus == "success") {
            this.loading = false;
            this.sentPostpone = true;
            setTimeout(() => {
              this.sentPostpone = false;
            }, 1500);
            setTimeout(async () => {
              this.saveModal = false;
              await this.reloadData();
              this.closePostpone();
            }, 2500);
          }
        }
      }

      if (action == "pending") {
        const res = await this.updateStatus("S6");
        if (res == "success") {
          await this.reloadData();
          this.isPending = true;
          setTimeout(() => {
            this.isPending = false;
          }, 2000);
        } else {
          alert("error");
        }
      }
    },
    async getAllReportStatus(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reportStatus/detail/${reportId}`,
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
              this.allStatus.push(this.activateStatus[i].status);
            }
          }
          this.activateStatus[i].isActive = true;
          this.activateStatus[i].divider = true;
          this.activateStatus[0].divider = false;
        }
        // console.log(this.activateStatus);
      });
    },
    async updateStatus(status, detail) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/statusReport`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            reportId: parseInt(this.$route.params.id),
            status: status,
            detail: detail,
            updateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.message == "success") {
          return "success";
        } else {
          return "fail";
        }
      });
    },
    async selectPlanFixDate(date) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/selectedPlanFixDate`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            engageId: parseInt(this.reportEngage.engageId),
            selectedDate: date,
            updateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json();
      return data;
    },
    async changeCategory(newCategory) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/changeCategory`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            reportId: parseInt(this.$route.params.id),
            categoriesReport: newCategory,
            updateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json();
      return data;
    },
    async postponeEngage(dates) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/newFixDate`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            engageId: parseInt(this.reportEngage.engageId),
            step: parseInt(this.reportEngage.step + 1),
            dates: dates,
            updateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json();
      return data;
    },
    checkEngage() {
      const date1 = new Date(this.reportEngageDate[0].datetime);
      const date2 = new Date(this.reportEngageDate[1].datetime);
      const date3 = new Date(this.reportEngageDate[2].datetime);
      const date4 = new Date(this.reportEngageDate[3].datetime);
      if (
        date1 - this.currentDay > 0 &&
        this.dateShowFormat(date1) != this.dateShowFormat(this.currentDay)
      ) {
        if (date2 - date1 >= this.oneDayTime) {
          if (date3 - date2 >= this.oneDayTime) {
            if (date4 - date3 >= this.oneDayTime) {
              return "success";
            } else {
              this.reportEngageDate[3].ivlDate = true;
              return "fail";
            }
          } else {
            this.reportEngageDate[2].ivlDate = true;
            return "fail";
          }
        } else {
          this.reportEngageDate[1].ivlDate = true;
          return "fail";
        }
      } else {
        this.reportEngageDate[0].ivlDate = true;
        return "fail";
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
    timeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedTime = date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      return formatedTime;
    },
    dateTimeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const formatedTime = date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      return formatedDate + " " + formatedTime;
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
      return showDate;
    },
    async reloadData() {
      this.reportDetail = await this.getReportById(this.$route.params.id);
      this.reportEngage = await this.getReportEngage(this.$route.params.id);
      await this.getAllReportStatus(this.$route.params.id);
    },
    filterCategory(category) {
      for (let i in this.categoryLists) {
        if (this.categoryLists[i].engName == category) {
          return this.categoryLists[i].name;
        }
      }
    },
    openPostpone() {
      this.showModal = true;
      this.modalbg = true;
    },
    closePostpone() {
      this.showModal = false;
      this.modalbg = false;
    },
    clearPostpone() {
      this.postponeDetail = this.defaultPostponeDetail;
    },
    addDate() {
      let length = this.postponeDetail.newEngageDate.length;
      if (length < 7) {
        let newDate = length + 1;
        this.postponeDetail.newEngageDate.push({
          title: "date" + newDate,
          date: "",
          require: false,
          selectedPeriod: 0,
          period: {
            dayPeriod: [
              {
                id: 1,
                eng: "AM",
                th: "เช้า",
              },
              {
                id: 2,
                eng: "PM",
                th: "บ่าย",
              },
              {
                id: 3,
                eng: "ALL",
                th: "ทั้งวัน",
              },
            ],
          },
        });
        console.log(this.postponeDetail.newEngageDate);
      } else {
        return "maxnewdate";
      }
    },
    delDate() {
      let length = this.postponeDetail.newEngageDate.length;
      if (length > 3) {
        this.postponeDetail.newEngageDate.pop();
        console.log(this.postponeDetail.newEngageDate);
      } else {
        return "minnewdate";
      }
    },
    selectEngageDate(date) {
      this.selectedFixDate = date;
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
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
    filterNewEngage(detail) {
      console.log(detail.newEngageDate);
      let dates = [];
      for (let i in detail.newEngageDate) {
        const tempdate = {
          date: detail.newEngageDate[i].date,
          period: detail.newEngageDate[i].selectedPeriod.eng,
        };
        dates.push(tempdate);
      }
      console.log(dates);
      return dates;
    },
    filterPeriod(period) {
      for (let i in this.periodList) {
        if (period == this.periodList[i].eng) {
          return this.periodList[i].th;
        }
      }
    },
    previewImage(image) {
      this.modalbg = true;
      this.showImage = true;
      this.image = `${process.env.VUE_APP_API_URL}/download_report_image/${image}`;
    },
  },
};
</script>

<style></style>
