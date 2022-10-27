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
            v-model="this.reportById.title"
            type="text"
            class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea
            v-model="this.reportById.reportDes"
            class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>

        <div v-if="this.reportWithEngage.engageId">
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
                  :type="
                    this.reportWithEngage.status == 'waiting'
                      ? 'datetime-local'
                      : 'text'
                  "
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  :class="
                    this.reportWithEngage.status != 'waiting'
                      ? 'bg-rangmod-light-gray'
                      : ''
                  "
                  :readonly="this.reportWithEngage.status != 'waiting'"
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
                <div
                  v-if="
                    this.reportWithEngage.status != 'S6' &&
                    this.reportWithEngage.status != 'S7'
                  "
                  @click="postpone(engageDate.date)"
                  class="w-7 h-7 rounded-full"
                  :class="
                    engageDate.isActive
                      ? 'bg-rangmod-green'
                      : 'bg-rangmod-gray cursor-pointer transition-all hover:border-rangmod-green hover:border-4 hover:bg-rangmod-green/75'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
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
    <div
      v-if="this.isEngageDateNow"
      class="flex flex-row space-x-4 justify-end"
    >
      <div
        v-if="this.reportWithEngage.status != 'S7'"
        @click="this.showReviewModal = !this.showReviewModal"
        class="w-48 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-green shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-green hover:text-rangmod-green hover:shadow-none"
      >
        แก้ไขปัญหาเสร็จสิ้น
      </div>
      <div
        v-if="this.reportWithEngage.status == 'S7'"
        @click="this.$router.push('/member/report')"
        class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
      >
        ย้อนกลับ
      </div>
    </div>
    <div class="flex justify-end space-x-4">
      <div
        class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
      >
        <!-- <div

        @click="showModal = !showModal"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-blue shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-blue hover:text-rangmod-light-blue hover:shadow-none"
        >
          เลื่อนนัด
        </div> -->

        <!-- <div
          v-if="!this.isEngageDateNow"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
        >
          ยกเลิกนัด
        </div> -->
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
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
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
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
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
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-end">
            <div
              v-on:click="finish('success')"
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
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            />
          </div>

          <div class="text-rangmod-black">รายละเอียดปัญหา</div>
          <div class="mb-5">
            <textarea
              v-model="description"
              class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              readonly
            ></textarea>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row space-x-4 justify-between items-center">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="mb-5">
                <div class="text-rangmod-black">เวลา</div>
                <input
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
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

    <div
      :class="
        showReviewModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showReviewModal = !showReviewModal"
    ></div>
    <transition>
      <div
        v-show="showReviewModal"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showReviewModal = false" class="cursor-pointer">
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
          <div class="text-2xl text-rangmod-purple mb-5">ให้คะแนน / รีวิว</div>

          <div class="flex flex-row space-x-4 justify-center mb-5">
            <div v-for="(rate, i) in rates" :key="i">
              <!-- <div v-html="star" @click="rating(score.score)"></div> -->
              <svg
                @mouseover="fillStar(rate.score)"
                @mouseleave="removeStar(rate.score)"
                style="color: rgb(255, 221, 0)"
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  :fill="rate.hover ? '#ffdd00' : '#7f7f7a'"
                ></path>
              </svg>
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
              @click="finishAndReview()"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
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
      // title: this.report.reportDes,
      // description: this.report.reportDes,
      showModal: false,
      showFinish: false,
      showDelete: false,
      showReviewModal: false,
      token: localStorage.getItem("token"),
      reportById: {},
      reportEngageDate: [
        {
          date: "date1",
          // time: "",
          datetime: "",
          isActive: false,
        },
        {
          date: "date2",
          // time: "",
          datetime: "",
          isActive: false,
        },
        {
          date: "date3",
          // time: "",
          datetime: "",
          isActive: false,
        },
        {
          date: "date4",
          // time: "",
          datetime: "",
          isActive: false,
        },
      ],
      selectedDate: {},
      isEngageDateNow: false,
      rates: [
        {
          star: 1,
          score: 1,
          hover: false,
        },
        {
          star: 2,
          score: 2,
          hover: false,
        },
        {
          star: 3,
          score: 3,
          hover: false,
        },
        {
          star: 4,
          score: 4,
          hover: false,
        },
        {
          star: 5,
          score: 5,
          hover: false,
        },
      ],
      review: {
        score: 0,
        description: "",
      },
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.reportById = await this.getReportById();
      this.reportWithEngage = await this.getReportDetailWithEngage();
      this.reportEngageDate[0].datetime = this.dateTimeShowFormat(
        this.reportWithEngage.date1
      );
      this.reportEngageDate[1].datetime = this.dateTimeShowFormat(
        this.reportWithEngage.date2
      );
      this.reportEngageDate[2].datetime = this.dateTimeShowFormat(
        this.reportWithEngage.date3
      );
      this.reportEngageDate[3].datetime = this.dateTimeShowFormat(
        this.reportWithEngage.date4
      );
      for (let i = 0; i < this.reportEngageDate.length; i++) {
        if (
          this.reportEngageDate[i].date == this.reportWithEngage.selectedDate
        ) {
          this.reportEngageDate[i].isActive = true;
          this.selectedDate = this.reportEngageDate[i];
        }
      }
      this.isEngageDateNow = this.checkEngageDateNow();
      console.log(this.reportWithEngage.status == "S7");
    },
    postpone(selectedDate) {
      if (confirm("คุณต้องการเลื่อนการนัดวันซ่อมใช่หรือไม่")) {
        fetch(`https://dev.rungmod.com/api/customer/selectedPlanFixDate`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            EngageId: parseInt(this.reportWithEngage.engageId),
            SelectedDate: selectedDate,
          }),
        }).then(async () => {
          this.reportWithEngage = await this.getReportDetailWithEngage();
          alert("ทำการเลือกนัดวันเข้าซ่อมแล้ว");
        });
        // .then(
        //   async () =>
        //     (this.reportWithEngage = await this.getReportDetailWithEngage())
        // );
      }
    },
    finishAndReview() {
      console.log(parseInt(this.$route.params.id));
      console.log(this.review.score);
      console.log(this.review.description);
      if (this.review.description == "") {
        alert("กรุณาแสดงความคิดเห็นการแก้ไขปัญหานี้");
      } else {
        fetch(`https://dev.rungmod.com/api/customer/endJobReview`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Des: this.review.description,
            Score: this.review.score,
          }),
        }).then(() => {
          alert("ทำการให้คะแนนและแสดงความคิดเห็นแล้ว");
          this.showReviewModal = false;
        });
      }
      // this.showReviewModal = true;
      // console.log(this.showReviewModal);
    },
    rating(score) {
      this.review.score = score;
      console.log(score);
    },
    fillStar(score) {
      for(let i = 0 ; i < score; i++) {
          this.rates[i].hover = true
      }

    },
    removeStar(score) {
      for(let i = 0 ; i < score; i++) {
          this.rates[i].hover = false
      }
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
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
    async getReportById() {
      try {
        const res = await fetch(
          `https://dev.rungmod.com/api/customer/reportById`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
            }),
          }
        );
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    checkEngageDateNow() {
      return (
        this.selectedDate.datetime.split("  ")[0] ===
        this.dateFormat(Date.now())
      );
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
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return formatedDateTime;
    },
    dateTimeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const split = inputDate.split("T");
      const time = split[1].slice(0, 8);
      const formatedDateTime =
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        "   " +
        time;
      return formatedDateTime;
    },
  },
};
</script>

<style></style>
