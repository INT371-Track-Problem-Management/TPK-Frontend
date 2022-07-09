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
    <div class="flex flex-row justify-end space-x-4">
      <div
        @click="postpone(report.reportId)"
        disable="true"
        class="bg-rangmod-blue w-40 text-center text-white text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
      >
        เลื่อนนัด
      </div>

      <div
        @click="cancel(report.reportId)"
        class="bg-rangmod-dark-pink w-40 text-center text-white text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
      >
        ลบรายงานปัญหา
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
          isActive: false,
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
  },
};
</script>

<style></style>
