<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายละเอียดและสถานะ</div>
    <hr class="my-5 border-rangmod-purple" />

    <div class="w-full mx-auto my-12">
      <!-- status update -->
      <div class="hidden lg:flex flex-row justify-center">
        <div
          v-for="(status, i) in statusList"
          :key="i"
          class="flex items-center"
        >
          <div
            class="w-16 lg:w-20 xl:w-24 h-16 lg:h-20 xl:h-24 mx-auto rounded-full relative z-10"
            :class="
              status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray'
            "
          >
            <div class="absolute w-max -bottom-8 left-1/2 -translate-x-1/2">
              {{ status.name }}
            </div>
          </div>
          <div
            v-show="status.divider"
            class="w-20 h-3"
            :class="
              status.isActive ? 'bg-rangmod-light-yellow' : 'bg-rangmod-gray'
            "
          ></div>
        </div>
      </div>

      <!-- status update mobile -->
      <div
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
      </div>
    </div>

    <ReportForm :report="reportById"/>
  </div>
</template>

<script>
import ReportForm from "@/components/report/ReportForm.vue";

export default {
  components: { ReportForm },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      statusList: [
        {
          name: "รอรับเรื่อง",
          divider: true,
          isActive: true,
        },
        {
          name: "รอดำเนินการ",
          divider: true,
          isActive: true,
        },
        {
          name: "ดำเนินการแล้ว",
          divider: true,
          isActive: false,
        },
        {
          name: "เลื่อนนัด",
          divider: true,
          isActive: false,
        },
        {
          name: "ยกเลิกนัด",
          divider: true,
          isActive: false,
        },
        {
          name: "เสร็จสิ้น",
          divider: false,
          isActive: false,
        },
      ],
      reportById: {},
    };
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      this.reportById = await this.getReportById(this.id);
      console.log(this.reportById)
    },
    async getReportById(reportId) {
      console.log(reportId)
      try {
        // const res = await fetch(`https://dev.rungmod.com/api/reportById`, {
        const res = await fetch(`http://localhost:5000/api/reportById`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            ReportId: 82
          }),
        })
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    postpone(action) {
      console.log(action);
    },
    cancel(action) {
      console.log(action);
    },
    save(action) {
      console.log(action);
    },
  },
};
</script>

<style></style>
