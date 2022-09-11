<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายละเอียดและสถานะ</div>
    <hr class="my-5 border-rangmod-purple" />

    <div class="w-full mx-auto my-12">
      <!-- status update -->
      <!-- <div class="hidden lg:flex flex-row justify-center">
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
      </div> -->

      <!-- status update mobile -->
      <div
        class="w-full ml-32 flex flex-col justify-start"
      >
        <div
          v-for="(status, i) in activateStatus"
          :key="i"
          class="flex flex-row items-center pb-8 -mb-2 relative"
        >
        <!-- <div v-show="status.isActive"> -->
          <div v-show="status.isActive"
            class="w-5 h-5 rounded-full bg-rangmod-light-yellow"
          ></div>
          <div v-show="status.isActive" class="px-3 text-base md:text-lg">{{ status.name }}</div>
        <!-- </div> -->

          <div
            v-show="status.divider"
            class="w-1 h-10 absolute ml-2 bottom-1 z-20 bg-rangmod-light-yellow"
          ></div>
        </div>
      </div>
    </div>
    <hr class="my-12 border-rangmod-purple" />
    <ReportForm :report="reportDetail"/>
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
      token: localStorage.getItem("token"),
      statusList: [
        {
          id: 1,
          eng: "waiting",
          name: "รอรับเรื่อง",
          divider: false,
          isActive: true,
        },
        {
          id: 2,
          eng: "accept",
          name: "รับเรื่อง",
          divider: false,
          isActive: true,
        },
        {
          id: 3,
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          divider: false,
          isActive: true,
        },
        {
          id: 4,
          eng: "prepare",
          name: "รอดำเนินการ",
          divider: false,
          isActive: true,
        },
        {
          id: 5,
          eng: "postpone",
          name: "เลื่อนนัด",
          divider: false,
          isActive: true,
        },
        {
          id: 6,
          eng: "cancle",
          name: "ยกเลิกนัด",
          divider: false,
          isActive: true,
        },
        {
          id: 7,
          eng: "success",
          name: "เสร็จสิ้น",
          divider: false,
          isActive: true,
        },
      ],
      activateStatus: [
      ],
      reportByCreatedBy:[],
      reportDetail: {},
      reportId: parseInt(this.id),
    };
  },
  mounted() {
    this.create();
    
  },
  methods: {
    async create() {
      // console.log(this.$route.params.id)
      this.reportByCreatedBy = await this.getReportByCreatedBy();
      for(let i = 0; i < this.reportByCreatedBy.length; i++) {
        if(this.reportByCreatedBy[i].reportId == this.$route.params.id) {
          this.reportDetail = this.reportByCreatedBy[i]
          this.checkStatus(this.reportDetail.status)
          
        }
      }
      // console.log(this.reportByCreatedBy);
      // this.checkStatus(this.reportById);
    },
    async getReportByCreatedBy() {
      try {
        const res = await fetch(`https://dev.rungmod.com/api/customer/reportByCreatedBy`, {
          method: "POST",
          headers: { "content-Type": "application/json" ,
                     "Authorization": `Bearer ${this.token}`,},
          body: JSON.stringify({
            CreatedBy: parseInt(localStorage.getItem("id"))
          }),
        })
        // console.log(reportId)
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    checkStatus(status) {
      if(status == 'success') {
        this.statusList[0].divider = true
        this.statusList[1].divider = true
        this.statusList[2].divider = true
        this.statusList[3].divider = true
        this.statusList[4].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[1])
        this.activateStatus.push(this.statusList[2])
        this.activateStatus.push(this.statusList[3])
        this.activateStatus.push(this.statusList[4])
        this.activateStatus.push(this.statusList[5])
      } else if(status == 'postpone') {
        this.statusList[0].divider = true
        this.statusList[1].divider = true
        this.statusList[2].divider = true
        this.statusList[3].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[1])
        this.activateStatus.push(this.statusList[2])
        this.activateStatus.push(this.statusList[3])
        this.activateStatus.push(this.statusList[4])
      } else if(status == 'prepare') {
        this.statusList[0].divider = true
        this.statusList[1].divider = true
        this.statusList[2].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[1])
        this.activateStatus.push(this.statusList[2])
        this.activateStatus.push(this.statusList[3])
      } else if(status == 'engage') {
        this.statusList[0].divider = true
        this.statusList[1].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[1])
        this.activateStatus.push(this.statusList[2])
      } else if(status == 'accept') {
        this.statusList[0].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[1])
      } else if(status == 'cancel') {
        this.statusList[0].divider = true
        this.activateStatus.push(this.statusList[0])
        this.activateStatus.push(this.statusList[5])
      } else if(status == 'waiting') {
        this.activateStatus.push(this.statusList[0])
      }
      // this.activateStatus.push()
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
