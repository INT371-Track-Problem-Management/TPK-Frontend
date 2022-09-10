<template>
  <div class="w-full xl:w-4/5 mx-auto mb-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-10">
      <div class="flex md:hidden flex-col justify-start">
        <div class="text-rangmod-black">รหัสช่างซ่อม</div>
        <div class="mb-5">
          <input
            v-model="this.maintainerId"
            type="number" min="1"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>

        <!-- <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
        <div class="mb-5">
          <input
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div> -->
      </div>

      <div class="flex flex-col justify-start">
        <div class="text-rangmod-black">หัวข้อปัญหา</div>
        <div class="mb-5">
          <input
            v-model="this.reportDetail.title"
            type="text"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea
            v-model="this.reportDetail.reportDes"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>

        <div v-if="checkAccept()">
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
                  :type="this.reportDetail.status == 'engage' ? 'text' : 'datetime-local'"
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
                <div
                  class="w-7 h-7 rounded-full "
                  :class="
                  engageDate.date == this.reportEngageAll.selectedDate ? 'bg-rangmod-green' : 'bg-rangmod-gray'
                "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="checkAccept()" class="hidden md:flex flex-col justify-start">
        <div class="text-rangmod-black">รหัสช่างซ่อม</div>
        <div class="mb-5">
          <input
            v-model="this.maintainerId"
            type="number" min="1"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>

        <!-- <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
        <div class="mb-5">
          <input
            v-model="this.reportDetail.title"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div> -->
      </div>
    </div>
    <div v-if="this.reportDetail.status != 'cancel'" class="flex flex-row space-x-4 justify-end">
      <div
        v-if="checkAccept()"
        v-on:click="actionButton('finish')"
        class="w-48 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-green shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-green hover:text-rangmod-green hover:shadow-none"
      >
        แก้ไขปัญหาเสร็จสิ้น
      </div>
    </div>
    <div class="flex justify-end space-x-4">
      <div v-if="this.reportDetail.status != 'cancel'"
        class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
      >
        <div
          v-if="checkAccept()"
          @click="actionButton('postpone')"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-blue shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-blue hover:text-rangmod-light-blue hover:shadow-none"
        >
          เลื่อนนัด
        </div>

        <div
          v-if="checkAccept()"
          @click="actionButton('cancel')"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
        >
          ยกเลิกนัด
        </div>

        <div
          v-if="checkAccept()"
          @click="actionButton('save')"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
        >
          บันทึก
        </div>
      </div>

      <div
        v-if="!checkAccept()"
        @click="actionButton('accept')"
        class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-blue shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-blue hover:text-rangmod-blue hover:shadow-none"
      >
        รับเรื่อง
      </div>

      <div
        v-if="this.reportDetail.status == 'cancel'"
        @click="actionButton('delete')"
        class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
      >
        ลบรายงาน
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["id"],
  data() {
    return {
      token: localStorage.getItem("token"),
      empId: localStorage.getItem("id"),
      status: "",
      maintainerId: 1,
      reportDetail: {},
      reportEngageAll: {},
      reportEngage: {},

      reportEngageDate: [
        {
          date: "date1",
          // time: "",
          datetime: "",
          isActive: true
        },
        {
          date: "date2",
          // time: "",
          datetime: "",
          isActive: false
        },
        {
          date: "date3",
          // time: "",
          datetime: "",
          isActive: false
        },
        {
          date: "date4",
          // time: "",
          datetime: "",
          isActive: false
        },
      ],
      dorms: []
        
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.reportDetail = await this.getReportDetail()
      this.reportEngageAll = await this.getAllReportEngage();
      console.log(this.reportEngageAll.selectedDate);
      this.$parent.checkStatus(this.reportDetail.status)
      this.status = this.reportDetail.status
      this.reportEngageDate[0].datetime = this.dateTimeShowFormat(this.reportEngageAll.date1)
      this.reportEngageDate[1].datetime = this.dateTimeShowFormat(this.reportEngageAll.date2)
      this.reportEngageDate[2].datetime = this.dateTimeShowFormat(this.reportEngageAll.date3)
      this.reportEngageDate[3].datetime = this.dateTimeShowFormat(this.reportEngageAll.date4)
      // console.log(this.reportEngageDate[0].datetime)
      // console.log(this.reportDetail);
      // for(let i = 0; i < this.reportEngageAll.length; i++) {
      //   alert('sad')
        // console.log(parseInt(this.$route.params.id))
        // console.log(this.reportEngageAll[i].reportId)
        // if(this.reportEngageAll[i].reportId == parseInt(this.$route.params.id)) {
        //   // console.log(this.reportEngageAll[i].reportId)
        //   this.reportEngage = this.reportEngageAll[i]
        //   console.log(this.reportEngage)
        // }
      // }
    },

    checkAccept() {
      return this.reportDetail.status != "waiting";
    },
    actionButton(action) {
      if (action == "accept") {
        console.log(this.checkAccept())
        if (confirm("ต้องการรับเรื่องรายงานนี้ใช่หรือไม่")) {
          fetch(`https://dev.rungmod.com/api/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              "Authorization": `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: "S2",
              EmployeeId: parseInt(this.empId),
            }),
          })
          .then(async() => {
            this.reportDetail = await this.getReportDetail()
            this.checkAccept()
            console.log(this.reportDetail.status);
            this.$parent.updateStatus(this.reportDetail.status)
            console.log(this.checkAccept())
          }
          )
          alert('ทำการรับเรื่องรายงานแล้ว')
        }
      }


      if (action == "save") {
        if(confirm("ต้องการบันทึกการนัดเข้าซ่อมใช่หรือไม่")) {
          fetch(`https://dev.rungmod.com/api/employee/CreateReportEngage`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            Date1: this.dateTimeFormat(this.reportEngageDate[0].datetime),
            Date2: this.dateTimeFormat(this.reportEngageDate[1].datetime),
            Date3: this.dateTimeFormat(this.reportEngageDate[2].datetime),
            Date4: this.dateTimeFormat(this.reportEngageDate[3].datetime),
            ReportId: parseInt(this.$route.params.id),
            DormId: 1,
            UpdatedBy: parseInt(this.empId),
            SelectedBy: this.reportDetail.createdBy
          }),
        })
        fetch(`https://dev.rungmod.com/api/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              "Authorization": `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: "S3",
              EmployeeId: parseInt(this.empId),
            }),
          })
          .then(async() => {
            this.reportDetail = await this.getReportDetail()
            this.checkAccept()
            console.log(this.reportDetail.status);
            this.$parent.updateStatus(this.reportDetail.status)
            console.log(this.checkAccept())
          }
          )
          fetch(`https://dev.rungmod.com/api/employee/assignFixReport`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            AssignDate: this.dateTimeFormat(Date.now()),
            MaintainerId: this.maintainerId,
            EmployeeId: parseInt(this.empId),
            ReportId: parseInt(this.$route.params.id)
          }),
        })
          alert("ทำการบันทึกการนัดเข้าซ่อมแล้ว");
        }
      }

      if (action == "cancel") {
        if (confirm("ต้องการลบรายงานนี้ใช่หรือไม่")) {
          fetch(`https://dev.rungmod.com/api/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              "Authorization": `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: 'S6',
              EmployeeId: parseInt(this.empId)
            }),
          });
          this.$parent.updateCancelStatus();
          alert("ทำการยกเลิกนัดรายงานแล้ว")
        }
      }


      if (action == "postpone") {
        if (confirm("ต้องการเลื่อนนัดรายงานนี้ใช่หรือไม่")) {
        fetch(`https://dev.rungmod.com/api/employee/statusReport`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Status: "S5",
            EmployeeId: parseInt(this.empId),
          }),
        });
        fetch(`https://dev.rungmod.com/api/employee/selectedPlanFixDate`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            EngageId: parseInt(this.$route.params.id),
            SelectedDate: "date2",
          }),
        });
        alert("ทำการเลื่อนนัดรายงานแล้ว")
      }
      }


      if (action == "finish") {
        if (confirm("ต้องการสำเร็จรายงานนี้ใช่หรือไม่")) {
        fetch(`https://dev.rungmod.com/api/employee/statusReport`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Status: "S7",
            EmployeeId: parseInt(this.empId),
          }),
        });
        alert("รายงานนี้เสร็จสิ้นแล้ว!!")
      }
      }

      if (action == "delete") {
        if (confirm("ต้องการลบรายงานนี้ใช่หรือไม่")) {
        fetch(`https://dev.rungmod.com/api/employee/deleteReportById`, {
          method: "DELETE",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: this.reportDetail.reportId,
          }),
        });
        alert("ทำการลบรายงานแล้ว")
        // this.$router.push(`/dashboard/report`);
      }
      }
    },
    async getReportDetail() {
      const res = await fetch(
        `https://dev.rungmod.com/api/employee/reportById`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
          }),
        }
      );
      const data = res.json();
      return data;
    },
    async getAllReportEngage() {
      const res = await fetch(
        `https://dev.rungmod.com/api/employee/reportEngageByReportId/${this.reportDetail.reportId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data
    },
    // async getDorm() {
    //   const res = await fetch(
    //     `https://dev.rungmod.com/api/employee/dorm`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "content-Type": "application/json",
    //         "Authorization": `Bearer ${this.token}`,
    //       },
    //     }
    //   );
    //   const data = res.json();
    //   return data;
    // },
    dateFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
    },
    dateTimeFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDateTime =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
