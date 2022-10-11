<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-5 px-5 shadow-md py-2"
  >
    <div class="text-xl">แดชบอร์ด</div>
    <hr class="my-4 border-rangmod-purple" />
    <div class="flex flex-row space-x-2">
      <!-- <div
        @click="isActivateBoth = !isActivateBoth"
        class="h-auto flex flex-col w-1/4 my-4 py-2 rounded-3xl text-rangmod-black border-2 border-rangmod-light-gray transition-all"
        :class="isActivateBoth ? '' : 'hover:bg-rangmod-light-gray'"
      >
        <div class="flex items-center justify-between cursor-pointer px-4">
          <div>{{ this.selectedBoth }}</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
            :class="
              isActivateBoth ? 'transition-all rotate-180' : 'transition-all'
            "
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </div>
        <transition name="bounce">
          <div v-show="isActivateBoth" class="flex flex-row-reverse">
            <div
              class="z-50 max-h-96 overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
            >
              <div v-for="(both, i) in boths" :key="i">
                <div
                  class="py-2 hover:font-bold text-right cursor-pointer"
                  @click="(this.selectedBoth = both), (isActivateBoth = true)"
                >
                  {{ both }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div> -->

      <div
        @click="isActivateMonth = !isActivateMonth"
        class="h-auto flex flex-col sm:w-1/4 ssm:w-1/3 w-1/2 my-4 py-2 rounded-3xl text-rangmod-black border-2 border-rangmod-light-gray transition-all"
        :class="isActivateMonth ? '' : 'hover:bg-rangmod-light-gray'"
      >
        <div class="flex items-center justify-between cursor-pointer px-4">
          <div>{{ this.selectedMonth.name }}</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
            :class="
              isActivateMonth ? 'transition-all rotate-180' : 'transition-all'
            "
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </div>
        <transition name="bounce">
          <div v-show="isActivateMonth" class="flex flex-row-reverse">
            <div
              class="z-50 max-h-96 overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
            >
              <div v-for="(month, i) in months" :key="i">
                <div
                  class="py-2 hover:font-bold text-right cursor-pointer"
                  @click="
                    (this.selectedMonth = month), (isActivateMonth = true),getDashboard()
                  "
                >
                  {{ month.name }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div
        @click="isActivateYear = !isActivateYear"
        class="h-auto flex flex-col sm:w-1/4 ssm:w-1/3 w-1/2 my-4 py-2 rounded-3xl text-rangmod-black border-2 border-rangmod-light-gray transition-all"
        :class="isActivateYear ? '' : 'hover:bg-rangmod-light-gray'"
      >
        <div class="flex items-center justify-between cursor-pointer px-4">
          <div>{{ this.selectedYear.year }}</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
            :class="
              isActivateYear ? 'transition-all rotate-180' : 'transition-all'
            "
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            />
          </svg>
        </div>
        <transition name="bounce">
          <div v-show="isActivateYear" class="flex flex-row-reverse">
            <div
              class="z-50 max-h-96 overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
            >
              <div v-for="(year, i) in years" :key="i">
                <div
                  class="py-2 hover:font-bold text-right cursor-pointer"
                  @click="(this.selectedYear = year), (isActivateYear = true),getDashboard()"
                >
                  {{ year.year }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="flex md:flex-row h-fit">
      <div
        class="bg-white rounded-xl text-rangmod-black font-primary mx-2 my-5 px-5 w-full xmd:w-4/6 py-4 border border-rangmod-light-gray transition-all"
      >
        <div class="">{{ this.selectedYear.year }} | {{ this.selectedMonth.name }}</div>
        <hr class="my-4 border-rangmod-light-gray" />
        <div class="flex flex-row justify-center">
          <div class="flex flex-col mx-auto">
            <div class="mb-[26px] text-right">{{ 100 * 4 /100}}</div>
            <div class="mb-[26px] text-right">{{ 75 * 4 /100}}</div>
            <div class="mb-[26px] text-right">{{ 50 * 4 /100}}</div>
            <div class="mb-[26px] text-right">{{ 25 * 4 /100}}</div>
            <div class="text-right">0</div>
          </div>

          <div v-for="(category, i) in reportCategory" :key="i" class="mx-auto">
            <div class="bg-[#F2F7FF] h-56 rounded-full flex flex-col-reverse">
              <transition 
                name="bounce"
                
                :class="category.count > 0 ? 'min-h-[32px]' : 'h-0'"
                :style="`height:${category.count*25}%`"
              >
                <div class="w-8 rounded-full h-full" :class="category.bg"></div>
              </transition>
            </div>
            <!-- <div class="mt-2 w-8 mx-auto text-center">
              <div>{{ category.name }}</div>
            </div> -->
          </div>
        </div>
        <div class="flex flex-wrap mt-8 justify-start">
          <div v-for="(category, i) in reportCategory" :key="i">
            <div class="flex flex-row items-center mr-4">
              <div class="h-2 w-2 rounded-full mr-1" :class="category.bg"></div>
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-xl hidden xmd:flex flex-col text-rangmod-black font-primary mx-2 my-5 px-5 w-full md:w-2/6 py-2 h-2/5 border border-rangmod-gray transition-all"
      >
        <div class="">ปัญหาทั้งหมด</div>
        <div class="my-5">
          <div class="text-5xl font-bold text-center">
            {{ this.allReportCount}}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 xse:grid-cols-2 xmd:grid-cols-4 sm:grid-cols-3 transition-all">
      <div
        class="bg-white border-rangmod-gray rounded-xl border px-5 pt-2 pb-3 my-2 mx-2 xmd:hidden transition-all"
      >
        <div class="">ปัญหาทั้งหมด</div>
        <div class="items-center text-5xl font-bold text-center">
          {{ this.allReportCount}}
        </div>
      </div>
      <div v-for="(category, i) in reportCategory" :key="i" class="">
        <div
          class="bg-white rounded-xl border px-5 pt-2 pb-3 my-2 mx-2"
          :class="category.border"
        >
          <div class="">{{ category.name }}</div>
          <div class="items-center text-5xl font-bold text-center">
            {{ category.count}}
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
          name: "ทุกเดือน"
        },
      selectedYear: {
          id: 0,
          year: "ทุกปี"
        },
      isActivateMonth: false,
      isActivateYear: false,
      months: [
        {
          id: 0,
          name: "ทุกเดือน"
        },
        {
          id: 1,
          name: "มกราคม"
        },
        {
          id: 2,
          name: "กุมภาพันธ์"
        },
        {
          id: 3,
          name: "มีนาคม"
        },
        {
          id: 4,
          name: "เมษายน"
        },
        {
          id: 5,
          name: "พฤษภาคม"
        },
        {
          id: 6,
          name: "มิถุยน"
        },
        {
          id: 7,
          name: "กรกฎาคม"
        },
        {
          id: 8,
          name: "สิงหาคม"
        },
        {
          id: 9,
          name: "กันยายน"
        },
        {
          id: 10,
          name: "ตุลาคม"
        },
        {
          id: 11,
          name: "พฤศจิกายน"
        },
        {
          id: 12,
          name: "ธันวาคม"
        },
      ],
      years: [
        {
          id: 0,
          year: "ทุกปี"
        },
        {
          id: 1,
          year: 2019
        },
        {
          id: 2,
          year: 2020
        },
        {
          id: 3,
          year: 2021
        },
        {
          id: 4,
          year: 2022
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
          id: 2,
          name: "น้ำ",
          engName: "water",
          count: 0,
          border: "border-rangmod-cat-orange",
          bg: "bg-rangmod-cat-orange",
        },
        {
          id: 3,
          name: "อุปกรณ์ไฟฟ้า",
          engName: "electric_device",
          count: 0,
          border: "border-rangmod-cat-yellow",
          bg: "bg-rangmod-cat-yellow",
        },
        {
          id: 4,
          name: "อุปกรณ์เกี่ยวกับน้ำ",
          engName: "water_machine",
          count: 0,
          border: "border-rangmod-cat-green",
          bg: "bg-rangmod-cat-green",
        },
        {
          id: 5,
          name: "เฟอร์นิเจอร์",
          engName: "furniture",
          count: 0,
          border: "border-rangmod-cat-light-blue",
          bg: "bg-rangmod-cat-light-blue",
        },
        {
          id: 6,
          name: "อาคารชำรุด",
          engName: "building",
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
      dashboardReport: {}
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
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getDashboard()
      // for(let i in this.dashboardReport) {
      //   for(let j in this.reportCategory) {
      //     if(i == this.reportCategory[j].engName) {
      //       this.reportCategory[j].count = this.dashboardReport[i]
      //     }
      //   }
      // }
      this.importData()
      console.log(this.dashboardReport);
    },
    // async getAllRequest() {
    //   const res = await fetch(`https://dev.rungmod.com/api/employee/report`, {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${this.token}` },
    //   });
    //   const data = res.json();
    //   return data;
    // },
    async getDashboard() {
      if(this.selectedMonth.id != 0 && this.selectedYear.id == 0) {
        console.log('กรุณาเลือกปี');
      } else {
        const res = await fetch(`https://dev.rungmod.com/api/employee/dashboard`, {
        method: "POST",
        headers: { "content-Type": "application/json", Authorization: `Bearer ${this.token}` },
        body: JSON.stringify({
          Month: this.selectedMonth.id == 0 ? 0 : this.selectedMonth.id,
          Year: this.selectedYear.id == 0 ? 0 : this.selectedYear.year,
        }),
      });
      const data = res.json();
      return data
      .then((data) => {
        console.log(data);
        this.dashboardReport = data
        this.importData()
      })
      }
    },
    test() {
      // console.log(this.selectedMonth);
      // console.log(this.selectedMonth.name == "ทุกเดือน" ? 0 : this.selectedMonth.id);
      // console.log(this.selectedYear == "ทุกปี" ? 0 : this.selectedYear);
    },
    importData() {
      for(let i in this.dashboardReport) {
        for(let j in this.reportCategory) {
          if(i == this.reportCategory[j].engName) {
            this.reportCategory[j].count = this.dashboardReport[i]
          }
        }
      }
    }
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
