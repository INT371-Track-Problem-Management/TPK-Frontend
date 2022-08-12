<template>
  <div class="w-full xl:w-3/4 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-24">
      <div class="flex md:hidden flex-col justify-start">
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
      </div>

      <div class="flex flex-col justify-start">
        <div class="text-rangmod-black">หัวข้อปัญหา</div>
        <div class="mb-5">
          <input
            :value="report.title"
            type="text"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea v-model="description"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>

        <div class="text-rangmod-black">วันและเวลาที่นัด</div>

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
        </div>
      </div>

      <div class="hidden md:flex flex-col justify-start">
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
      </div>
    </div>
    <div class="flex flex-row justify-end space-x-4 mb-5">
    <div
        @click="showFinish = !showFinish"
        disable="true"
        class="bg-rangmod-green w-fit text-center text-white text-xl p-4 rounded-full transition-all cursor-pointer hover:brightness-90 "
      >
        แก้ไขปัญหาเสร็จสิ้น
      </div>
      </div>
    <div class="flex flex-row justify-end space-x-4 mb-5">
      <div
        @click="showModal = !showModal"
        disable="true"
        class="bg-rangmod-blue w-40 text-center text-white text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
      >
        เลื่อนนัด
      </div>

      <div
        @click="showDelete = !showDelete"
        class="bg-rangmod-dark-pink w-40 text-center text-white text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
      >
        ยกเลิกนัด
      </div>

      <div
        @click="save('save')"
        class="bg-rangmod-purple w-40 text-center text-white text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
      >
        บันทึก
      </div>

      <!-- status update mobile -->
      <!-- <div
        class="w-full md:w-2/5 mx-auto lg:hidden flex flex-col justify-start"
      >
        <div
          v-for="(status, i) in statusList"
          :key="i"
          class="flex flex-row items-center space-x-6 pb-8 -mb-1 relative"
        >
          <div
            class="w-16 h-16 rounded-full"
            :class="
              status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray'
            "
          ></div>
          <div class="text-base md:text-lg">{{ status.name }}</div>

          <div
            v-show="status.divider"
            class="w-2 h-20 absolute left-1 bottom-1 z-20"
            :class="
              status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray'
            "
          ></div>
        </div>
      </div> -->
    
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
          <div
            class="flex flex-row space-x-4 justify-between items-center"
          >
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
          <div
            class="flex flex-row space-x-4 justify-between items-center"
          >
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
              v-on:click="sendReport()"
              class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-purple text-rangmod-purple hover:shadow-none"
            >
              ยกเลิก
            </div>
            <div
              v-on:click="sendReport()"
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
          <div
            class="flex flex-row space-x-4 justify-between items-center"
          >
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
          <div class="text-2xl text-rangmod-purple mb-5">
            แจ้งยกเลิกนัด
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
          <div
            class="flex flex-row space-x-4 justify-between items-center"
          >
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
              v-on:click="delete('delete')"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยกเลิกนัด
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import router from '@/router';

export default {
  props: ["report"],
  data() {
    return {
      description: this.report.reportDes,
      engageDates: [
        {
          date: "2022-05-25",
          time: "08:02:27",
          // dateTime: '',
          isActive: true,
        },
        {
          date: "2022-07-26",
          time: "09:04:27",
          // dateTime: '',
          isActive: true,
        },
        {
          date: "2022-09-27",
          time: "10:06:27",
          // dateTime: '',
          isActive: false,
        },
        {
          date: "2022-11-28",
          time: "11:08:27",
          // dateTime: '',
          isActive: false,
        },
      ],
      showModal: false,
      showFinish: false,
      showDelete: false,
    };
  },
  mount() {
    this.create();
  },
  methods: {
    create() {
      console.log(this.report);
    },
    postpone(reportId) {
      if (
        this.report.status == "รอรับเรื่อง" ||
        // this.report.status == "รอซ่อม" ||
        this.report.status == "ยกเลิกนัด" ||
        this.report.status == "เสร็จสิ้น"
      ) {
        alert("Can't change status");
      } else {
        fetch(`https://dev.rungmod.com/api/statusReport`, {
          method: "PUT",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            ReportId: reportId,
            Status: "เลื่อนนัด",
          }),
        }).then(() => {
          alert("Status change!");
        });
      }
    },
    cancel(reportId) {
      fetch(`https://dev.rungmod.com/api/deleteReportById`, {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          ReportId: reportId,
        }),
      }).then(() => {
        alert("Delete report!");
        this.$router.push(`/member/report`);
      });
    },
    save(action) {
      console.log(action);
    },
    finish(action) {
      console.log(action);
    },
    delete(action) {
      console.log(action);
    },
  },
};
</script>

<style></style>
