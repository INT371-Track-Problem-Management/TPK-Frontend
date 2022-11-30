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
        class="flex flex-col ssm-2:flex-row justify-between items-end space-x-4 transition-all"
      >
        <div class="flex flex-row space-x-2 items-center mb-4">
          <div
            @click="(showModal = true), (modalBg = true)"
            class="px-8 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-90 bg-rangmod-light-yellow"
          >
            <div class="text-rangmod-dark-yellow text-lg">แจ้งปัญหา</div>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row justify-end items-end space-x-4 transition-all"
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
              <div
                v-else
                class="cursor-pointer"
                :class="filterItem.status.color"
              >
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
                  openSortFilter
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
      </div>

      <table class="w-full text-rangmod-black mb-10 hidden md:table">
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
          v-for="(report, i) in filteredReport"
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
      v-if="modalBg"
      class="bg-black fixed inset-0 opacity-60 visible z-[70]"
    ></div>

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

            <div class="mb-4">
              <div class="flex flex-row">
                <div class="text-rangmod-black ml-1">ประเภทปัญหา</div>
                <div
                  v-if="validate.categoriesReport"
                  class="text-rangmod-red px-1"
                >
                  *จำเป็น
                </div>
              </div>

              <div class="relative">
                <div
                  @click="isActivateCategory = !isActivateCategory"
                  class="w-full bg-white border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-between cursor-pointer items-center"
                >
                  <div class="cursor-pointer flex flex-row">
                    <div
                      v-if="reportForSend.categoriesReport != ''"
                      class="cursor-pointer"
                    >
                      {{ filterCategory(reportForSend.categoriesReport) }}
                    </div>
                    <div v-else class="text-rangmod-gray">&nbsp;</div>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
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
                <div
                  class="z-[100] w-full absolute flex flex-col"
                  :class="
                    isActivateCategory
                      ? 'py-2 px-4 transition-all max-h-min h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray'
                      : 'max-h-[0vh]'
                  "
                >
                  <div
                    v-for="(cat, i) in categoryLists"
                    :key="i"
                    class="w-full flex justify-end"
                    :class="
                      isActivateCategory
                        ? ' max-h-min h-fit hover:font-bold cursor-pointer'
                        : 'max-h-[0vh]'
                    "
                  >
                    <div
                      @click="
                        (reportForSend.categoriesReport = cat.engName),
                          (isActivateCategory = false)
                      "
                      :class="
                        isActivateCategory
                          ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                          : 'opacity-0 max-h-[0vh]'
                      "
                    >
                      {{ cat.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex flex-row">
                <div class="text-rangmod-black ml-1">หัวข้อปัญหา</div>
                <div v-if="validate.title" class="text-rangmod-red px-1">
                  *จำเป็น
                </div>
              </div>
              <div class="mb-3">
                <input
                  v-model="reportForSend.title"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                />
              </div>
            </div>
            <div class="mb-4">
              <div class="flex flex-row">
                <div class="text-rangmod-black ml-1">รายละเอียดปัญหา</div>
                <div v-if="validate.title" class="text-rangmod-red px-1">
                  *จำเป็น
                </div>
              </div>
              <div class="mb-3">
                <textarea
                  v-model="reportForSend.reportDes"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                ></textarea>
              </div>
            </div>
            <div class="flex flex-row space-x-3">
              <div
                @click="uploadImage()"
                class="relative flex justify-center w-32 my-2 py-2 text-base rounded-full text-center text-white border-2 bg-rangmod-light-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-purple hover:text-rangmod-light-purple hover:shadow-none"
              >
                อัพโหลดรูปภาพ
                <div
                  class="absolute w-full h-full items-center rounded-full cursor-pointer"
                >
                  <input
                    id="uploadImage"
                    type="file"
                    @change="handleFileUpload($event)"
                    class="cursor-pointer"
                    hidden
                  />
                </div>
              </div>
              <div
                v-if="file != ''"
                class="text-[#007AFF] flex flex-col justify-center"
              >
                {{ file.name }}
              </div>
              <div
                v-else-if="validate.file"
                class="text-rangmod-red font-sm flex flex-col justify-center"
              >
                *จำเป็น
              </div>
            </div>


            <div v-for="(engage, i) in reportEngageDate" :key="i">
              <div class="mb-4">
                <div
                  v-if="i == 0"
                  class="text-rangmod-black ml-1 flex flex-row space-x-1"
                >
                  <div>วันและเวลาที่นัด</div>
                  <div
                    v-if="validateDate[i].date"
                    class="text-rangmod-red font-sm"
                  >
                    *ใส่วันเวลาใหม่
                  </div>
                </div>
                <div
                  v-else
                  class="text-rangmod-black ml-1 flex flex-row space-x-1"
                >
                  <div>วันและเวลา ({{ i + 1 }})</div>
                  <div
                    v-if="validateDate[i].date"
                    class="text-rangmod-red font-sm"
                  >
                    *ใส่วันเวลาใหม่
                  </div>
                </div>
                <div class="flex flex-col">
                  <div
                    class="flex flex-col ssm:flex-row ssm:space-x-2 space-y-1 ssm:space-y-0 justify-between"
                  >
                    <div class="flex flex-col w-full">
                      <div class="text-rangmod-black ml-1">ว/ด/ป</div>
                      <input
                        v-model="engageForSend[i].date"
                        type="date"
                        class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                      />
                    </div>
                    <div class="relative w-full">
                      <div class="flex flex-col w-full">
                        <div class="text-rangmod-black ml-1">
                          เวลาเริ่มต้น - สิ้นสุด
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
                        </div>
                      </div>
                      <div
                        class="z-[100] w-full absolute flex flex-col"
                        :class="
                          engage.isActive
                            ? 'py-2 px-4 transition-all max-h-48 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
                            : 'max-h-[0vh]'
                        "
                      >
                        <div
                          v-for="(slot, j) in timeSlot"
                          :key="j"
                          class="w-full flex justify-end"
                          :class="
                            engage.isActive
                              ? ' max-h-48 h-fit hover:font-bold cursor-pointer'
                              : 'max-h-[0vh]'
                          "
                        >
                          <div
                            @click="
                              (engage.isActive = false),
                                (engageForSend[i].period = slot.period),
                                (engageForSend[i].time = slot.time),
                                (reportForSend.dates[i].date = manageDatetime(
                                  engageForSend[i].date,
                                  engageForSend[i].time
                                ))
                            "
                            :class="
                              engage.isActive
                                ? 'transition-all w-full max-h-48 h-fit py-2 text-right'
                                : 'opacity-0 max-h-[0vh]'
                            "
                          >
                            {{ slot.period }}
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
      preview: null,
      token: localStorage.getItem("token"),
      createdBy: parseInt(localStorage.getItem("id")),
      isActivateCategory: false,
      modalBg: false,
      showModal: false,
      loadingData: false,
      loading: false,
      sentReport: false,
      file: "",
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
        categoriesReport: false,
        file: false,
      },
      validateDate: [
        { date: false },
        { date: false },
        { date: false },
        { date: false },
      ],

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
    
    checkfixDate() {
      const date = new Date();
      const now = date.getDate();
      const date1 = new Date(this.reportForSend.dates[0].date);
      const date2 = new Date(this.reportForSend.dates[1].date);
      const date3 = new Date(this.reportForSend.dates[2].date);
      const date4 = new Date(this.reportForSend.dates[3].date);
      if (date1.getDate() - now >= 1) {
        if (date2 - date1 >= 3600000) {
          if (date3 - date2 >= 3600000) {
            if (date4 - date3 >= 3600000) {
              return true;
            } else {
              this.validateDate[3].date = true;
              return false;
            }
          } else {
            this.validateDate[2].date = true;
            return false;
          }
        } else {
          this.validateDate[1].date = true;
          return false;
        }
      } else {
        this.validateDate[0].date = true;
        return false;
      }
    },
    validation() {
      this.reportForSend.title == ""
        ? (this.validate.title = true)
        : (this.validate.title = false);
      this.reportForSend.description == ""
        ? (this.validate.description = true)
        : (this.validate.description = false);
      this.reportForSend.categoriesReport == ""
        ? (this.validate.categoriesReport = true)
        : (this.validate.categoriesReport = false);
      this.file == ""
        ? (this.validate.file = true)
        : (this.validate.file = false);
      return (
        this.validate.title ||
        this.validate.description ||
        this.validate.categoriesReport ||
        this.validate.file
      );
    },
    async create() {
      this.loadingData = true;
      this.reportList = await this.getReport();
      this.filteredReport = this.reportList;
      if (this.reportList) {
        this.loadingData = false;
      }
    },
    async sendReport() {
      if (!this.validation() && this.checkfixDate()) {
        let formData = new FormData();
        this.reportForSend.buildingId = this.buildingId;
        let rfs = this.reportForSend;
        this.modalBg = false;
        this.loading = true;
        let formJson = JSON.stringify({
          title: rfs.title,
          categoriesReport: rfs.categoriesReport,
          reportDes: rfs.reportDes,
          status: rfs.status,
          roomId: rfs.roomId,
          buildingId: rfs.buildingId,
          step: rfs.step,
          dates: rfs.dates,
          updateBy: rfs.updateBy,
        });

        formData.append("data", formJson);
        formData.append("image", this.file);

        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/customer/report`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
            body: formData,
          }
        );
        const data = res.json();
        console.log(data);
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
            this.filteredReport = this.reportList;
          } else {
            this.loading = false;
          }
        });
      } else {
        setTimeout(() => {
          for (let i in this.validateDate) {
            this.validateDate[i].date = false;
          }
          this.validate.title = false;
          this.validate.description = false;
          this.validate.categoriesReport = false;
          this.validate.file = false;
        }, 2000);
      }
    },
    async uploadImage() {
      document.getElementById("uploadImage").click();
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
      return data.then((res) => {
        if (res == null) {
          this.loadingData = false;
          return res;
        }
        return res;
      });
    },
    handleFileUpload(e) {
      this.file = e.target.files[0];
      console.log(this.file);
    },
    clearData() {
      this.title = "";
      this.description = "";
      this.category = "";
      this.reportForSend = {
        categoriesReport: "",
        title: "",
        reportDes: "",
        status: "S1",
        roomId: parseInt(this.$route.params.id),
        buildingId: 0,
        step: 1,
        dates: [{ date: "" }, { date: "" }, { date: "" }, { date: "" }],
        updateBy: parseInt(localStorage.getItem("id")),
      };
      this.engageForSend = [
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
      ];
    },
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    checkThaiStatus(status) {
      for (let i in this.statusList) {
        if (status == this.statusList[i].id) {
          return this.statusList[i].name;
        }
      }
    },
    filterCategory(category) {
      for (let i in this.categoryLists) {
        if (this.categoryLists[i].engName == category) {
          return this.categoryLists[i].name;
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
    manageDatetime(date, time) {
      return date + " " + time;
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
      if (sort.eng == "date_d") {
        this.filteredReport.sort(function (a, b) {
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return db - da; 
        });
      }
      if (sort.eng == "date_a") {
        this.filteredReport.sort(function (a, b) {
          console.log(a);
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return da - db; 
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
          return fb - fa; 
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
          return fa - fb; 
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

<style scoped></style>
