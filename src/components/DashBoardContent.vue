<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-5 px-5 shadow-md py-2"
  >
    <div class="text-xl">แดชบอร์ด</div>
    <hr class="my-4 border-rangmod-purple" />
    <div class="mb-5 flex flex-col xse:flex-row xse:space-x-2 space-y-2 mx-2 max-w-screen-ssm-2">
      <div class="w-full relative">
        <div
          @click="isActivateMonth = !isActivateMonth"
          class="w-full bg-white border border-rangmod-light-gray rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-between cursor-pointer items-center"
        >
          <div class="cursor-pointer flex flex-row">
            <div class="cursor-pointer">
              {{ selectedMonth.name }}
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
            viewBox="0 0 16 16"
            :class="
              isActivateMonth ? 'transition-all rotate-180' : 'transition-all'
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
            isActivateMonth
              ? 'py-2 px-4 transition-all max-h-56 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
              : 'max-h-[0vh]'
          "
        >
          <div
            v-for="(month, i) in months"
            :key="i"
            class="w-full flex justify-end"
            :class="
              isActivateMonth
                ? 'max-h-56 h-fit hover:font-bold cursor-pointer'
                : 'max-h-[0vh]'
            "
          >
            <div
              @click="
                (selectedMonth = month),
                  (isActivateMonth = false),
                  getDashboard()
              "
              :class="
                isActivateMonth
                  ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                  : 'opacity-0 max-h-[0vh]'
              "
            >
              {{ month.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative">
        <div
          @click="isActivateYear = !isActivateYear"
          class="w-full bg-white border border-rangmod-light-gray rounded-lg outline-none px-2 leading-8 tracking-wider flex flex-row justify-between cursor-pointer items-center"
        >
          <div class="cursor-pointer flex flex-row space-x-1">
            <div class="cursor-pointer">
              {{ selectedYear.year }}
            </div>
            <div
              v-if="selectedMonth.id != 0 && selectedYear.id == 0"
              class="text-rangmod-red transition-all"
            >
              *กรุณาเลือกปี
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
            viewBox="0 0 16 16"
            :class="
              isActivateYear ? 'transition-all rotate-180' : 'transition-all'
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
            isActivateYear
              ? 'py-2 px-4 transition-all max-h-56 h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray overflow-y-auto no-scrollbar'
              : 'max-h-[0vh]'
          "
        >
          <div
            v-for="(year, i) in years"
            :key="i"
            class="w-full flex justify-end"
            :class="
              isActivateYear
                ? ' max-h-56 h-fit hover:font-bold cursor-pointer'
                : 'max-h-[0vh]'
            "
          >
            <div
              @click="
                (selectedYear = year), (isActivateYear = false), getDashboard()
              "
              :class="
                isActivateYear
                  ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                  : 'opacity-0 max-h-[0vh]'
              "
            >
              {{ year.year }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex md:flex-row h-fit">
      <div
        class="bg-white rounded-xl text-rangmod-black font-primary mx-2 pb-10 mb-5 px-5 w-full xmd:w-4/6 pt-4 border border-rangmod-light-gray transition-all"
      >
        <div class="">
          {{ this.selectedYear.year }} | {{ this.selectedMonth.name }}
        </div>
        <hr class="my-4 border-rangmod-light-gray" />
        <div class="flex flex-row justify-center">
          <div class="flex flex-col mx-auto">
            <div class="mb-[26px] text-right">
              {{ Math.round((calHighestCount.count * 4) / 4) }}
            </div>
            <div class="mb-[26px] text-right">
              {{ Math.round((calHighestCount.count * 3) / 4) }}
            </div>
            <div class="mb-[26px] text-right">
              {{ Math.round((calHighestCount.count * 2) / 4) }}
            </div>
            <div class="mb-[26px] text-right">
              {{ Math.round((calHighestCount.count * 1) / 4) }}
            </div>
            <div class="text-right">0</div>
          </div>

          <div v-for="(category, i) in reportCategory" :key="i" class="mx-auto">
            <div class="bg-[#F2F7FF] h-56 rounded-full flex flex-col-reverse">
              <transition
                name="bounce"
                :class="category.count > 0 ? 'min-h-[32px]' : 'h-0'"
                :style="category.count > 0 ? `height:${
                  (category.count * 100) / calHighestCount.count
                }%` : 'height:0%'"
              >
                <div
                  class="se:w-6 xse:w-8 w-4 rounded-full h-full transition-all"
                  :class="category.bg"
                ></div>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap md:hidden mt-5">
          <div v-for="(category, i) in reportCategory" :key="i">
            <div class="flex flex-row items-center mx-2 my-1">
              <div class="h-2 w-2 rounded-full mr-1" :class="category.bg"></div>
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white hidden md:flex flex-col justify-between text-rangmod-black font-primary mr-2 my-5 w-full md:w-2/6 h-full transition-all"
      >
        <div>
          <div v-for="(category, i) in reportCategory" :key="i">
            <div class="flex flex-row items-center mx-2 my-1">
              <div class="h-2 w-2 rounded-full mr-1" :class="category.bg"></div>
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>

        <div class="hidden xmd:flex w-full">
          <div
            class="bg-white rounded-xl text-rangmod-black content-end font-primary ml-2 mt-5 px-5 py-2 w-full h-full border border-rangmod-gray transition-all"
          >
            <div class="">ปัญหาทั้งหมด</div>
            <div class="my-5">
              <div class="text-5xl font-bold text-center">
                {{ this.allReportCount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 xse:grid-cols-2 xmd:grid-cols-4 sm:grid-cols-3 transition-all"
    >
      <div
        class="bg-white border-rangmod-gray rounded-xl border px-5 pt-2 pb-3 my-2 mx-2 xmd:hidden transition-all"
      >
        <div class="">ปัญหาทั้งหมด</div>
        <div class="items-center text-5xl font-bold text-center">
          {{ this.allReportCount }}
        </div>
      </div>
      <div v-for="(category, i) in reportCategory" :key="i" class="">
        <div
          class="bg-white rounded-xl border px-5 pt-2 pb-3 my-2 mx-2"
          :class="category.border"
        >
          <div class="">{{ category.name }}</div>
          <div class="items-center text-5xl font-bold text-center">
            {{ category.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      selectedMonth: {
        id: 0,
        name: "ทุกเดือน",
      },
      selectedYear: {
        id: 0,
        year: "ทุกปี",
      },
      isActivateMonth: false,
      isActivateYear: false,
      months: [
        {
          id: 0,
          name: "ทุกเดือน",
        },
        {
          id: 1,
          name: "มกราคม",
        },
        {
          id: 2,
          name: "กุมภาพันธ์",
        },
        {
          id: 3,
          name: "มีนาคม",
        },
        {
          id: 4,
          name: "เมษายน",
        },
        {
          id: 5,
          name: "พฤษภาคม",
        },
        {
          id: 6,
          name: "มิถุนายน",
        },
        {
          id: 7,
          name: "กรกฎาคม",
        },
        {
          id: 8,
          name: "สิงหาคม",
        },
        {
          id: 9,
          name: "กันยายน",
        },
        {
          id: 10,
          name: "ตุลาคม",
        },
        {
          id: 11,
          name: "พฤศจิกายน",
        },
        {
          id: 12,
          name: "ธันวาคม",
        },
      ],
      years: [
        {
          id: 0,
          year: "ทุกปี",
        },
        {
          id: 1,
          year: 2019,
        },
        {
          id: 2,
          year: 2020,
        },
        {
          id: 3,
          year: 2021,
        },
        {
          id: 4,
          year: 2022,
        },
      ],
      reportCategory: [
        {
          id: 1,
          name: "ไฟฟ้า",
          engName: "electric",
          count: 0,
          border: "border-rangmod-cat-red",
          bg: "bg-rangmod-cat-red",
        },
        {
          id: 3,
          name: "อุปกรณ์ไฟฟ้า",
          engName: "electric_device",
          count: 0,
          border: "border-rangmod-cat-orange",
          bg: "bg-rangmod-cat-orange",
        },
        {
          id: 5,
          name: "เฟอร์นิเจอร์",
          engName: "furniture",
          count: 0,
          border: "border-rangmod-cat-yellow",
          bg: "bg-rangmod-cat-yellow",
        },
        {
          id: 6,
          name: "อาคารชำรุด",
          engName: "building",
          count: 0,
          border: "border-rangmod-cat-green",
          bg: "bg-rangmod-cat-green",
        },
        {
          id: 2,
          name: "น้ำ",
          engName: "water",
          count: 0,
          border: "border-rangmod-cat-light-blue",
          bg: "bg-rangmod-cat-light-blue",
        },
        {
          id: 4,
          name: "อุปกรณ์เกี่ยวกับน้ำ",
          engName: "water_machine",
          count: 0,
          border: "border-rangmod-cat-dark-blue",
          bg: "bg-rangmod-cat-dark-blue",
        },
        {
          id: 7,
          name: "อื่น ๆ",
          engName: "other",
          count: 0,
          border: "border-rangmod-cat-purple",
          bg: "bg-rangmod-cat-purple",
        },
      ],
      dashboardReport: {},
    };
  },
  computed: {
    allReportCount() {
      let total = 0;
      for (let i in this.reportCategory) {
        total += this.reportCategory[i].count;
      }
      return total;
    },
    calHighestCount() {
      return this.reportCategory.reduce((a, b) => (a.count > b.count ? a : b));
    },
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getDashboard();
    },
    async getDashboard() {
      if (this.selectedMonth.id != 0 && this.selectedYear.id == 0) {
        console.log("กรุณาเลือกปี");
      } else {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/dashboard`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              Month: this.selectedMonth.id == 0 ? 0 : this.selectedMonth.id,
              Year: this.selectedYear.id == 0 ? 0 : this.selectedYear.year,
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          this.dashboardReport = data;
          this.importData();
        });
      }
    },
    importData() {
      for (let i in this.dashboardReport) {
        for (let j in this.reportCategory) {
          if (i == this.reportCategory[j].engName) {
            this.reportCategory[j].count = this.dashboardReport[i];
          }
        }
      }
      console.log(this.reportCategory);
    },
  },
};
</script>

<style></style>
