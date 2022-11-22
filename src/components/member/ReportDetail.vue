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
            <div class="flex flex-row justify-center my-10 items-center w-full">
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
    <!-- <ReportForm :report="reportDetail"/> -->
    <div v-else class="mx-16">
      <div class="flex flex-row justify-between mb-6">
        <div class="w-full flex justify-start">
          <div class="flex flex-col justify-start w-3/5">
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
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path
                      d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- <div v-if="true"> -->
            <div v-if="reportDetail.status != 'R1'" class="flex flex-col">
              <div v-for="(date, i) in reportEngage.fixDate" :key="i">
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
                            class="flex flex-col justify-center h-full absolute -right-10"
                          >
                            <div
                              v-if="reportEngage.selectedDate == date.id"
                              class="my-auto w-7 h-7 p-2 rounded-full bg-rangmod-green"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="reportDetail.status == 'R1'" class="flex flex-col">
              <div v-for="(date, i) in emptyEngage" :key="i">
                <div class="mb-4">
                  <div v-if="i == 0" class="text-rangmod-black ml-1">
                    วันและเวลาที่นัด
                  </div>
                  <div v-else class="text-rangmod-black ml-1">
                    วันและเวลา ({{ i + 1 }})
                  </div>
                  <div class="flex flex-col">
                    <div class="flex flex-row space-x-2 justify-between">
                      <div class="flex flex-col w-full relative">
                        <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                        <div>
                          <div
                            @click="date.isOpenDate = !date.isOpenDate"
                            class="relative w-full flex flex-row justify-between items-center border bg-white border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider cursor-pointer"
                          >
                            <div v-if="date.date != ''">
                              {{ date.date }}
                            </div>
                            <div v-else>&nbsp;</div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-chevron-down text-rangmod-purple"
                              viewBox="0 0 16 16"
                              :class="
                                date.isOpenDate
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
                            class="z-[100] w-full absolute flex flex-col"
                            :class="
                              date.isOpenDate
                                ? 'py-2 px-4 transition-all max-h-48 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
                                : 'max-h-[0vh]'
                            "
                          >
                            <div
                              v-for="(newDate, j) in newEngageForSelect"
                              :key="j"
                              class="w-full flex justify-end"
                              :class="
                                date.isOpenDate
                                  ? ' max-h-min h-fit hover:font-bold cursor-pointer'
                                  : 'max-h-[0vh]'
                              "
                            >
                              <div
                                @click="
                                  (date.isOpenDate = false),
                                    (emptyEngage[i].date = newDate.date),
                                    (emptyEngage[i].datetime =
                                      newDate.datetime),
                                    (emptyEngage[i].slot = newDate.slot)
                                "
                                :class="
                                  date.isOpenDate
                                    ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                                    : 'opacity-0 max-h-[0vh]'
                                "
                              >
                                {{ newDate.date }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-col w-full relative">
                        <div class="text-rangmod-black ml-1">
                          เวลาเริ่มต้น - สิ้นสุด
                        </div>
                        <div>
                          <div
                            @click="date.isOpenSlot = !date.isOpenSlot"
                            class="relative w-full flex flex-row justify-between items-center border bg-white border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider cursor-pointer"
                          >
                            <div v-if="date.period != ''">
                              {{ date.period }}
                            </div>
                            <div v-else>&nbsp;</div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-chevron-down text-rangmod-purple"
                              viewBox="0 0 16 16"
                              :class="
                                date.isOpenSlot
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
                            class="z-[100] w-full absolute flex flex-col"
                            :class="
                              date.isOpenSlot
                                ? 'py-2 px-4 transition-all max-h-48 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
                                : 'max-h-[0vh]'
                            "
                          >
                            <div
                              v-for="(slot, k) in emptyEngage[i].slot"
                              :key="k"
                              class="w-full flex justify-end"
                              :class="
                                date.isOpenSlot
                                  ? ' max-h-min h-fit hover:font-bold cursor-pointer'
                                  : 'max-h-[0vh]'
                              "
                            >
                              <div
                                @click="
                                  (date.isOpenSlot = false),
                                    (emptyEngage[i].period = slot.slot),
                                    (emptyEngage[i].time = slot.time),
                                    test()
                                "
                                :class="
                                  date.isOpenSlot
                                    ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                                    : 'opacity-0 max-h-[0vh]'
                                "
                              >
                                {{ slot.slot }}
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

        <!-- </div> -->
        <div class="w-full flex justify-end">
          <div class="flex flex-col space-y-8 h-fit w-4/5">
            <div
              class="border border-rangmod-purple bg-white rounded-3xl h-fit px-10 w-full"
              :class="reportEngage.maintainerId != 0 ? '' : 'hidden'"
            >
              <div class="hidden md:flex flex-col justify-start w-full">
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
              class="border border-rangmod-purple bg-rangmod-light-pink rounded-3xl px-10 w-full h-[440px] overflow-y-scroll no-scrollbar"
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
                  <div class="text-rangmod-black ml-1">
                    ช่วงเวลาที่ขอเปลี่ยน
                  </div>
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
                              <div class="text-rangmod-black ml-1">
                                ช่วงเวลา
                              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row space-x-4 justify-end">
        <div
          @click="
            (this.showFinish = !this.showFinish), (this.modalbg = !this.modalbg)
          "
          class="w-48 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-green shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-green hover:text-rangmod-green hover:shadow-none"
        >
          แก้ไขปัญหาเสร็จสิ้น
        </div>
      </div>
      <div v-if="!isCancel" class="flex justify-end space-x-4">
        <div
          class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
        >
          <div
            v-if="reportDetail.status == 'R1'"
            @click="
              (showPostpone = !showPostpone),
                (modalbg = !modalbg),
                formatSendDate(emptyEngage)
            "
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-ppbtn-blue shadow-lg cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-ppbtn-blue hover:text-rangmod-ppbtn-blue hover:shadow-none"
          >
            แก้ไขวันนัด
          </div>
        </div>
        <div
          class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
        >
          <div
            @click="showCancel = !showCancel"
            v-if="!this.isEngageDateNow"
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-purple shadow-lg cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            บันทึก
          </div>
        </div>
        <div
          class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
        >
          <div
            @click="(showCancel = !showCancel), (modalbg = !modalbg)"
            v-if="!this.isEngageDateNow"
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-lg cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
          >
            ยกเลิกนัด
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
              <div class="w-80 h-80 z-[150] mx-auto">
                <img :src="this.image" class="" />
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showPostpone"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div
                @click="(showPostpone = false), (modalbg = false)"
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
            <div>
              <div class="text-2xl text-rangmod-purple mb-5">
                วันนัดซ่อมใหม่
              </div>

              <div class="flex flex-col">
                <div v-for="(date, i) in emptyEngage" :key="i">
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
                          <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                          <div
                            class="w-full border bg-rangmod-light-gray border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                          >
                            {{ date.date }}
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
                              {{ date.time }}
                            </div>
                            <div
                              class="flex flex-col justify-center h-full absolute -right-10"
                            >
                              <div
                                class="my-auto w-7 h-7 p-2 rounded-full"
                              ></div>
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
                  @click="(showPostpone = false), (modalbg = false)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-red text-rangmod-red hover:bg-rangmod-red hover:border-white hover:text-white hover:shadow-none"
                >
                  ยกเลิก
                </div>
                <div
                  @click="sendNewEngage(newEngageForSend)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
                >
                  เลื่อนนัด
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showFinish"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div
                @click="(showFinish = false), (modalbg = false)"
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
              ยืนยันการแก้ไขปัญหา
            </div>
            <div class="text-rangmod-black">หัวข้อปัญหา</div>
            <div class="mb-5">
              <input
                v-model="reportDetail.title"
                type="text"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              />
            </div>

            <div class="text-rangmod-black">รายละเอียดปัญหา</div>
            <div class="mb-5">
              <textarea
                v-model="reportDetail.reportDes"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              ></textarea>
            </div>

            <!-- <div>
              <div class="flex flex-col">
              <div class="w-full">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลา</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ splitDate(fixDate) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="w-full">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลา</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ splitTime(fixDate) }}
                  </div>
                </div>
              </div>
            </div>
            </div> -->

            <div class="flex flex-row space-x-4 justify-end">
              <div
                v-on:click="openReview()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                แก้ไขปัญหาเสร็จสิ้น
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showCancel"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            v-if="loading || sentCancel"
            class="bg-black fixed inset-0 opacity-60 visible z-[90]"
          ></div>
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div
                @click="(showCancel = false), (modalbg = false)"
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
            <div class="text-2xl text-rangmod-purple mb-5">แจ้งยกเลิกนัด</div>
            <div class="text-rangmod-black">หัวข้อปัญหา</div>
            <div class="mb-5">
              <input
                v-model="reportDetail.title"
                type="text"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              />
            </div>

            <div class="text-rangmod-black">รายละเอียดปัญหา</div>
            <div class="mb-5">
              <textarea
                v-model="reportDetail.reportDes"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              ></textarea>
            </div>

            <div class="flex flex-row space-x-4 justify-end">
              <div
                @click="cancel()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-light-red text-rangmod-light-red hover:bg-rangmod-light-red hover:border-white hover:text-white hover:shadow-none"
              >
                ยกเลิกนัด
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
              v-if="sentCancel"
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
      </transition>

      <transition name="bounce">
        <div
          v-show="showReviewModal"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div
                @click="(showReviewModal = false), (modalbg = false)"
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
              ให้คะแนน / ความคิดเห็น
            </div>

            <div class="flex flex-row space-x-4 justify-center mb-5">
              <div v-for="(rate, i) in rates" :key="i">
                <div
                  @click="scored(rate.score)"
                  class="cursor-pointer"
                  :class="
                    rate.hover || rate.isActive ? 'text-rangmod-yellow' : ''
                  "
                >
                  <svg
                    @mouseover="fillStar(rate.score)"
                    @mouseleave="removeStar()"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    class="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="text-rangmod-black">ความคิดเห็น</div>
            <div class="mb-5">
              <textarea
                v-model="review.description"
                class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              ></textarea>
            </div>

            <div class="flex flex-row space-x-4 justify-end">
              <div
                @click="reviewReport()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <transition name="bounce">
      <div
        v-if="isPostpone"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-xs min-w-[320px] h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการเลือกวันนัดซ่อมสำเร็จ
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="accepted"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการรับเรื่องรายงานแล้ว
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="isCancel"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการยกเลิกรายงานแล้ว
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="isReview"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการให้คะแนนและแสดงความคิดเห็นแล้ว
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      createdBy: localStorage.getItem("id"),
      reportDetail: {},
      reportEngage: {},
      loadingData: false,
      loading: false,
      showImage: false,
      modalbg: false,
      showModal: false,
      showFinish: false,
      showCancel: false,
      showPostpone: false,
      showReviewModal: false,
      showCancelModal: false,
      sentCancel: false,
      isPostpone: false,
      // isCancel: false,
      isReview: false,
      openReportStatus: false,
      tempStatus: "waiting",
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
      rates: [
        {
          star: 1,
          score: 1,
          hover: false,
          isActive: false,
        },
        {
          star: 2,
          score: 2,
          hover: false,
          isActive: false,
        },
        {
          star: 3,
          score: 3,
          hover: false,
          isActive: false,
        },
        {
          star: 4,
          score: 4,
          hover: false,
          isActive: false,
        },
        {
          star: 5,
          score: 5,
          hover: false,
          isActive: false,
        },
      ],
      review: {
        score: 0,
        description: "",
      },
      activateStatus: [],
      newEngage: "",
      oldEngage: "",
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
      emptyEngage: [
        {
          date: "",
          slot: [],
          time: "",
          datetime: "",
          period: "",
          isOpenDate: false,
          isOpenSlot: false,
        },
        {
          date: "",
          slot: [],
          time: "",
          datetime: "",
          period: "",
          isOpenDate: false,
          isOpenSlot: false,
        },
        {
          date: "",
          slot: [],
          time: "",
          datetime: "",
          period: "",
          isOpenDate: false,
          isOpenSlot: false,
        },
        {
          date: "",
          slot: [],
          time: "",
          datetime: "",
          period: "",
          isOpenDate: false,
          isOpenSlot: false,
        },
      ],
      newEngageForSelect: [],
      newEngageForSend: [],
    };
  },
  computed: {
    isCancel() {
      return this.reportDetail.status == "S6";
    },
    statusIsAccept() {
      return true;
    },
    // checkToday() {

    // }
  },
  mounted() {
    this.create();
    console.log();
  },
  methods: {
    filterSelectedDate() {
      for (let i in this.reportEngage.fixDate) {
        if (this.reportEngage.fixDate[i].id == this.reportEngage.selectedDate) {
          console.log(this.reportEngage.fixDate[i].date);
          this.fixDate = this.reportEngage.fixDate[i].date;
          break;
        }
      }
    },
    test() {
      const date = new Date(Date.now());
      console.log(date);
      console.log(date.getDate());
      console.log(date.getMonth());
      console.log(date.getFullYear());
    },
    sortNewEngage(newDate) {
      for (let i in newDate) {
        const temp = {
          datetime: newDate[i].date,
          date: this.splitDate(newDate[i].date),
          slot: this.filterSlot(newDate[i].period),
        };
        this.newEngageForSelect.push(temp);
      }
      // console.log(this.newEngageForSelect);
    },
    async create() {
      this.loadingData = true;
      this.reportDetail = await this.getReportById(this.$route.params.id);
      this.reportEngage = await this.getReportEngage(this.$route.params.id);
      // console.log(this.reportDetail);
      // console.log(this.reportEngage);
      this.assignedMaintainer = await this.getAssignedMaintainer(
        this.reportEngage.maintainerId
      );
      await this.getAllReportStatus(this.$route.params.id);
      this.postponeDetail.description = this.activateStatus[0].detail;
      for (let i in this.reportEngage.fixDate) {
        this.postponeDetail.newEngageDate.push({
          date: this.reportEngage.fixDate[i].date,
          period: this.reportEngage.fixDate[i].period,
        });
      }
      if (
        this.reportDetail &&
        this.reportEngage &&
        this.assignedMaintainer &&
        this.activateStatus
      ) {
        this.loadingData = false;
      }
      this.sortNewEngage(this.postponeDetail.newEngageDate);
      this.filterSelectedDate();
      const now = new Date();
      const temp1 = this.splitDateOg(this.fixDate);
      const temp2 = this.setUpperFloor(temp1);
      const date1 = new Date(temp1);
      const date2 = new Date(temp2);
      const tt1 = now - date1;
      const tt2 = now - date2;
      console.log(now - 0);
      console.log(now - date1);
      console.log(now - date2);
      console.log(date1 - date2);
      console.log(tt1 - tt2 <= date2 - date1); // use
      // console.log(this.setUpperFloor(temp));
      // console.log(now);
    },
    async getReportById(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/report/detail/${reportId}`,
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
        `${process.env.VUE_APP_API_URL}/customer/reportEnagegFixDate/detail/${reportId}`,
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
      // return data.then(async (data) => {
      //   if (data.engageId == 0) {
      //     this.reportDetail = await this.getReportById();
      //   } else {
      //     this.reportDetail = data;
      //     this.reportEngageDate[0].datetime = this.engageShowFormat(
      //       this.reportDetail.date1
      //     );
      //     this.reportEngageDate[1].datetime = this.engageShowFormat(
      //       this.reportDetail.date2
      //     );
      //     this.reportEngageDate[2].datetime = this.engageShowFormat(
      //       this.reportDetail.date3
      //     );
      //     this.reportEngageDate[3].datetime = this.engageShowFormat(
      //       this.reportDetail.date4
      //     );
      //     this.reportEngageDate[0].ogdatetime = this.reportDetail.date1;
      //     this.reportEngageDate[1].ogdatetime = this.reportDetail.date2;
      //     this.reportEngageDate[2].ogdatetime = this.reportDetail.date3;
      //     this.reportEngageDate[3].ogdatetime = this.reportDetail.date4;
      //     await this.getAssignedMaintainer(data.maintainerId);
      //   }
      // });
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
      // return data.then((data) => {
      //   if (data.maintainerId != 0) {
      //     this.assignedMaintainer = data;
      //   }
      // });
    },
    engageShowFormat(engage) {
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      const showTime = res[1].split("Z");
      return showDate + " " + showTime[0];
    },
    async getAllReportStatus(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reportStatus/detail/${reportId}`,
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
    async sendNewEngage(dates) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/newFixDate`,
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
            updateBy: parseInt(this.createdBy),
          }),
        }
      );
      const data = res.json();
      return data;
      // return data.then(async (data) => {
      //   if (data.message == "success") {
      //     await this.updateStatus("S8");
      //     await this.reloadData();
      //     this.isPostpone = true;
      //     setTimeout(() => {
      //       this.isPostpone = false;
      //     }, 2000);
      //     setTimeout(() => {
      //       this.showPostpone = false;
      //       this.modalbg = false;
      //     }, 3000);
      //   } else {
      //     alert("error");
      //   }
      // });
    },
    async cancel() {
      this.modalbg = false;
      this.loading = true;
      const res = await this.updateStatus("S9");
      if (res == "success") {
        this.loading = false;
        this.sentCancel = true;
        setTimeout(() => {
          this.sentCancel = false;
        }, 1500);
        setTimeout(async () => {
          this.showCancel = false;
          this.sentCancel = false;
          await this.reloadData();
        }, 2500);
      } else {
        alert("error");
      }
    },
    async finish() {
      const res = this.updateStatus("S7");
      if (res == "success") {
        alert("success");
      }
    },
    postponeFormat(datetime) {
      const res = datetime.split("T");
      const res2 = res[1].split("Z");
      return res[0] + " " + res2[0];
    },
    async updateStatus(status) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/statusReport`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Status: status,
            UpdateBy: parseInt(this.createdBy),
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
    engageDateTimeShowFormat(engage) {
      if (engage == "") {
        return "";
      } else {
        const res = engage.split("T");
        const dateRes = res[0].split("-");
        const showDate =
          dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
        const showTime = res[1].split("Z");
        return showDate + " " + showTime[0];
      }
    },
    fillStar(score) {
      for (let i = 0; i < score; i++) {
        this.rates[i].hover = true;
      }
    },
    removeStar() {
      for (let i in this.rates) {
        this.rates[i].hover = false;
      }
    },
    scored(score) {
      if (this.rates[score - 1].isActive == true) {
        for (let i in this.rates) {
          this.rates[i].isActive = false;
        }
        this.review.score = 0;
      } else {
        for (let i in this.rates) {
          if (i < score) {
            this.rates[i].isActive = true;
          } else {
            this.rates[i].isActive = false;
          }
        }
        this.review.score = score;
      }
    },
    openReview() {
      this.showFinish = !this.showFinish;
      setTimeout(() => {
        this.showReviewModal = !this.showReviewModal;
      }, 500);
    },
    async reviewReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/endJobReview`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            reportId: parseInt(this.$route.params.id),
            des: this.review.description,
            score: this.review.score,
            updateBy: parseInt(this.createdBy),
            maintainerId: parseInt(this.reportEngage.maintainerId),
          }),
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.message == "success") {
          this.isReview = true;
          setTimeout(() => {
            this.isReview = false;
          }, 2000);
          setTimeout(() => {
            this.showReviewModal = false;
            this.modalbg = false;
          }, 2500);
          return "success";
        } else {
          return "fail";
        }
      });
    },
    async reloadData() {
      await this.getReportEngage(this.$route.params.id);
      await this.getAllReportStatus(this.$route.params.id);
    },
    filterCategory(category) {
      for (let i in this.categoryLists) {
        if (this.categoryLists[i].engName == category) {
          return this.categoryLists[i].name;
        }
      }
    },
    filterPeriod(period) {
      for (let i in this.periodList) {
        if (period == this.periodList[i].eng) {
          return this.periodList[i].th;
        }
      }
    },
    splitDate(datetime) {
      const res = datetime.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
    },
    splitTime(datetime) {
      const res = datetime.split("T");
      const timeRes = res[1].split("Z");
      const showTime = timeRes[0].slice(0, -6);
      const showTime2 = parseInt(showTime) + 1;
      const start = timeRes[0].slice(0, -3);
      const end = this.pad(showTime2) + ":00";
      return start + " - " + end;
    },
    formatSendDate(emptyEngage) {
      this.newEngageForSend = [];
      if (this.newEngageForSend.length != 4) {
        for (let i in emptyEngage) {
          const sd =
            emptyEngage[i].datetime == ""
              ? ""
              : emptyEngage[i].datetime.slice(0, 10);
          const temp = {
            date: sd + " " + emptyEngage[i].time,
            period: "",
          };
          console.log(temp);
          this.newEngageForSend.push(temp);
        }
      }
    },
    filterSlot(period) {
      if (period == "AM") {
        return this.periodTimeList.AM;
      }
      if (period == "PM") {
        return this.periodTimeList.PM;
      }
      if (period == "ALL") {
        return this.periodTimeList.ALL;
      }
    },
    previewImage(image) {
      this.modalbg = true;
      this.showImage = true;
      this.image = `${process.env.VUE_APP_API_URL}/download_report_image/${image}`;
    },
    splitDateOg(datetime) {
      // this.setUpperFloor(datetime.split("T")[0]);
      return datetime.split("T")[0];
    },
    setUpperFloor(datetime) {
      const res = datetime.split("-");
      // console.log(`${res[0]}-${res[1]}-${this.pad(parseInt(res[2])+1)}`);
      return `${res[0]}-${res[1]}-${this.pad(parseInt(res[2]) + 1)}`;
    },
  },
};
</script>

<style></style>
