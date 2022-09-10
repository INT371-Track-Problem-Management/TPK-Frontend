<template>
  <div class="w-full xl:w-3/4 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-6">
      <div class="flex md:hidden flex-col justify-start">
        <div class="text-rangmod-black">ชื่อ-นามสกุลช่าง</div>
        <div class="mb-5">
          <input

            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>

        <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
        <div class="mb-5">
          <input

            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>
      </div>

      <div class="flex flex-col justify-start">
        <div class="text-rangmod-black">หัวข้อปัญหา</div>
        <div class="mb-5">
          <input
            v-model="this.reportWithEngage.title"
            type="text"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea
            v-model="this.reportWithEngage.reportDes"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>
        
        <div>
          <div class="text-rangmod-black">วันและเวลาที่นัด</div>

          <div class="flex flex-col">
            <div
              v-for="(engageDate, i) in reportEngageDate"
              :key="i"
              class="flex flex-row space-x-4 justify-start items-center"
            >
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป เวลาที่นัด</div>
                <input
                  v-model="engageDate.datetime"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                />
              </div>

              <!-- <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  v-model="engageDate.time"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                />
              </div> -->

              <div class="w-7">
                <div @click="postpone(engageDate.date)"
                  class="w-7 h-7 rounded-full cursor-pointer"
                  :class="
                  engageDate.date == this.reportWithEngage.selectedDate ? 'bg-rangmod-green' : 'bg-rangmod-gray'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="text-rangmod-black">วันและเวลาที่นัด</div>

        <div class="flex flex-col">
          <div
            v-for="(engageDate, i) in engageDates"
            :key="i"
            class="flex flex-row space-x-4 justify-between items-center"
          >
            <div class="mb-5">
              <div class="text-rangmod-black">ว/ด/ป</div>
              <input
                type="text"
                class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="engageDate.date"
              />
            </div>

            <div class="mb-5">
              <div class="text-rangmod-black">เวลา</div>
              <input
                type="text"
                class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="engageDate.time"
              />
            </div>

            <div class="w-7">
              <div
                class="w-7 h-7 rounded-full"
                :class="
                  engageDate.isActive ? 'bg-rangmod-green' : 'bg-rangmod-gray'
                "
              ></div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div class="hidden md:flex flex-col justify-start">
        <div class="text-rangmod-black">ชื่อ-นามสกุลช่าง</div>
        <div class="mb-5">
          <input
            :value="report.reportId"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>

        <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
        <div class="mb-5">
          <input
            :value="report.reportId"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>
      </div> -->
    </div>
    <div class="flex justify-end space-x-4">
      <div
        class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
      >
        <div

        @click="showModal = !showModal"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-blue shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-blue hover:text-rangmod-light-blue hover:shadow-none"
        >
          เลื่อนนัด
        </div>

        <div


          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
        >
          ยกเลิกนัด
        </div>

      </div>

    </div>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-80'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>

    <transition>
      <div
        v-show="showModal"
        class="fixed w-full h-screen z-90 inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showModal = false" class="cursor-pointer">
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
          <div class="text-rangmod-black">หัวข้อปัญหา</div>
          <div class="mb-5">
            <input
              v-model="title"
              type="text"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>
            </div>
          </div>
          <div>วันเลื่อนนัดครั้งถัดไป</div>
          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row space-x-4 justify-end">
            <div
            @click="postpone()"
              class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-purple text-rangmod-purple hover:shadow-none"
            >
              ยกเลิก
            </div>
            <div
            @click="postpone()"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              เลื่อนนัด
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div
      :class="
        showFinish
          ? 'bg-black fixed inset-0 opacity-60 visible z-80'
          : 'hidden opacity-0'
      "
      v-on:click="showFinish = !showFinish"
    ></div>
    <transition>
      <div
        v-show="showFinish"
        class="fixed w-full h-screen z-90 inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showFinish = false" class="cursor-pointer">
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
              v-model="title"
              type="text"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="finish('finish')"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              แก้ไขปัญหาเสร็จสิ้น
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div
      :class="
        showDelete
          ? 'bg-black fixed inset-0 opacity-60 visible z-80'
          : 'hidden opacity-0'
      "
      v-on:click="showDelete = !showDelete"
    ></div>
    <transition>
      <div
        v-show="showDelete"
        class="fixed w-full h-screen z-90 inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showDelete = false" class="cursor-pointer">
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
              v-model="title"
              type="text"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="delete 'delete'"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยกเลิกนัด
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import router from '@/router';

export default {
  props: ["report"],
  data() {
    return {
      reportWithEngage: {},
      title: this.report.reportDes,
      description: this.report.reportDes,
      showModal: false,
      showFinish: false,
      showDelete: false,
      token: localStorage.getItem("token"),
      
      reportEngageDate: [
        {
          date: "date1",
          // time: "",
          datetime: "",
          // isActive: true
        },
        {
          date: "date2",
          // time: "",
          datetime: "",
          // isActive: false
        },
        {
          date: "date3",
          // time: "",
          datetime: "",
          // isActive: false
        },
        {
          date: "date4",
          // time: "",
          datetime: "",
          // isActive: false
        },
      ],
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      // console.log(localStorage.getItem('id'));
      this.reportWithEngage = await this.getReportDetailWithEngage();
      this.reportEngageDate[0].datetime = this.dateTimeShowFormat(this.reportWithEngage.date1)
      this.reportEngageDate[1].datetime = this.dateTimeShowFormat(this.reportWithEngage.date2)
      this.reportEngageDate[2].datetime = this.dateTimeShowFormat(this.reportWithEngage.date3)
      this.reportEngageDate[3].datetime = this.dateTimeShowFormat(this.reportWithEngage.date4)
      console.log(this.reportWithEngage);
      // console.log(this.$route.params.id);
    },
    postpone(selectedDate) {
      if(confirm('คุณต้องการเลื่อนการนัดวันซ่อมใช่หรือไม่')) {
        fetch(`https://dev.rungmod.com/api/customer/selectedPlanFixDate`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              "Authorization": `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              EngageId: parseInt(this.reportWithEngage.engageId),
              SelectedDate: selectedDate
            }),
          }).then(alert('ทำการเลื่อนนัดวันเข้าซ่อมแล้ว')).then(async() => this.reportWithEngage = await this.getReportDetailWithEngage())
        }
    },
    finish(action) {
      console.log(action);
    },
    delete(action) {
      console.log(action);
    },
    async getReportDetailWithEngage() {
      const res = await fetch(
        `https://dev.rungmod.com/api/customer/getReportEngageWithReport/?reportId=${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          }
        }
      );
      const data = res.json();
      return data;
    },
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    dateTimeFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDateTime =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return formatedDateTime;
    },
    dateTimeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDateTime =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "   " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return formatedDateTime;
    },
  },
};
</script>

<style></style>
