<template>
  <div class="w-full xl:w-4/5 mx-auto mb-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-10">
      <div class="flex md:hidden flex-col justify-start">
        <div class="text-rangmod-black">รหัสช่างซ่อม</div>
        <div class="mb-5">
          <input
            v-model="this.maintainerId"
            type="number"
            min="1"
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
            class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea
            v-model="this.reportDetail.reportDes"
            class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
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
                  :type="
                    this.reportDetail.status == 'waiting'
                      ? 'datetime-local'
                      : 'text'
                  "
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  :class="
                    this.reportDetail.status != 'waiting'
                      ? 'bg-rangmod-light-gray'
                      : ''
                  "
                  :readonly="this.reportDetail.status != 'waiting'"
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

              <div
                v-if="engageDate.date == this.reportEngageAll.selectedDate"
                class="w-7"
              >
                <div class="w-7 h-7 rounded-full bg-rangmod-green"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-rangmod-purple rounded-3xl h-fit px-10">
        <div class="hidden md:flex flex-col justify-start">
          <div class="text-rangmod-purple my-5">ข้อมูลช่าง</div>
          <div class="flex flex-row space-x-4">
            <div>
              <div class="text-rangmod-black">ชื่อ</div>
              <div class="mb-5">
                <input
                  v-model="this.maintainer.fname"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  :class="isEdit ? '' : 'bg-rangmod-light-gray'"
                />
              </div>
            </div>
            <div>
              <div class="text-rangmod-black">นามสกุล</div>
              <div class="mb-5">
                <input
                  v-model="this.maintainer.lname"
                  type="text"
                  class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  :class="isEdit ? '' : 'bg-rangmod-light-gray'"
                />
              </div>
            </div>
          </div>
          <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
          <div class="mb-5">
            <input
              v-model="this.maintainer.phone"
              type="text"
              class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
              :class="isEdit ? '' : 'bg-rangmod-light-gray'"
            />
          </div>
        </div>
        <div v-if="!isEdit"
          @click="isEdit = !isEdit"
          class="float-right w-28 mb-5 py-2 text-lg rounded-full text-center border-2 text-rangmod-black bg-rangmod-light-yellow shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
        >
          แก้ไข
        </div>
        <div v-if="isEdit"
          @click="isEdit = !isEdit"
          class="float-right w-28 mb-5 py-2 text-lg rounded-full text-center border-2 text-rangmod-black bg-rangmod-light-yellow shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
        >
          บันทึก
        </div>
      </div>
    </div>
    <div
      v-if="this.reportDetail.status == 'success'"
      class="flex flex-row space-x-4 justify-end"
    >
      <div
        @click="actionButton('review')"
        class="w-48 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-green shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-green hover:text-rangmod-green hover:shadow-none"
      >
        คะแนนการรายงาน
      </div>
    </div>
    <div
      v-if="this.reportDetail.status != 'success'"
      class="flex justify-end space-x-4"
    >
      <div
        class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
      >
        <div
          v-if="checkAccept() && this.reportDetail.status != 'cancel'"
          @click="actionButton('cancel')"
          class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
        >
          ยกเลิกนัด
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
      maintainer: {
        id: 0,
        fname: "",
        lname: "",
        phone: "",
      },
      reportDetail: {},
      reportEngageAll: {},
      reportEngage: {},

      reportEngageDate: [
        {
          date: "date1",
          // time: "",
          datetime: "",
          isActive: true,
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
      dorms: [],
      showReviewModal: false,
      isEdit: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.reportDetail = await this.getReportDetail();
      console.log(this.reportDetail);
      this.reportEngageAll = await this.getAllReportEngage();
      console.log(this.reportEngageAll);
      this.$parent.checkStatus(this.reportDetail.status);
      this.status = this.reportDetail.status;
      this.reportEngageDate[0].datetime = this.dateTimeShowFormat(
        this.reportEngageAll.date1
      );
      this.reportEngageDate[1].datetime = this.dateTimeShowFormat(
        this.reportEngageAll.date2
      );
      this.reportEngageDate[2].datetime = this.dateTimeShowFormat(
        this.reportEngageAll.date3
      );
      this.reportEngageDate[3].datetime = this.dateTimeShowFormat(
        this.reportEngageAll.date4
      );
      if (this.reportDetail.status == "success") {
        return;
      } else {
        if (this.reportEngageAll.selectedDate != "") {
          this.updateStatusFromSelectedDate().then(
            this.$parent.checkStatus(this.reportDetail.status)
          );
        }
      }
    },

    checkAccept() {
      return this.reportDetail.status != "waiting";
    },
    actionButton(action) {
      if (action == "accept") {
        console.log(this.checkAccept());
        if (
          this.reportEngageDate[0].datetime == "" ||
          this.reportEngageDate[1].datetime == "" ||
          this.reportEngageDate[2].datetime == "" ||
          this.reportEngageDate[3].datetime == ""
        ) {
          alert("กรุณาใส่วันนัดซ่อมให้ครบ");
        } else if (confirm("ต้องการรับเรื่องรายงานนี้ใช่หรือไม่")) {
          fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: "S2",
              EmployeeId: parseInt(this.empId),
            }),
          })
            .then(
              fetch(`${process.env.VUE_APP_API_URL}/employee/CreateReportEngage`, {
                method: "POST",
                headers: {
                  "content-Type": "application/json",
                  Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({
                  Date1: this.dateTimeFormat(this.reportEngageDate[0].datetime),
                  Date2: this.dateTimeFormat(this.reportEngageDate[1].datetime),
                  Date3: this.dateTimeFormat(this.reportEngageDate[2].datetime),
                  Date4: this.dateTimeFormat(this.reportEngageDate[3].datetime),
                  ReportId: parseInt(this.$route.params.id),
                  DormId: 1,
                  UpdatedBy: parseInt(this.empId),
                  SelectedBy: this.reportDetail.createdBy,
                }),
              })
            )
            .then(
              fetch(`${process.env.VUE_APP_API_URL}/employee/assignFixReport`, {
                method: "POST",
                headers: {
                  "content-Type": "application/json",
                  Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({
                  AssignDate: this.dateTimeFormat(Date.now()),
                  MaintainerId: this.maintainerId,
                  EmployeeId: parseInt(this.empId),
                  ReportId: parseInt(this.$route.params.id),
                }),
              })
            )
            .then(async () => {
              this.reportDetail = await this.getReportDetail();
              this.checkAccept();
              console.log(this.reportDetail.status);
              this.$parent.updateStatus(this.reportDetail.status);
              console.log(this.checkAccept());
            });
          alert("ทำการรับเรื่องรายงานแล้ว");
        }
      }

      if (action == "cancel") {
        if (confirm("ต้องการลบรายงานนี้ใช่หรือไม่")) {
          fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: "S6",
              EmployeeId: parseInt(this.empId),
            }),
          });
          this.$parent.updateCancelStatus();
          alert("ทำการยกเลิกนัดรายงานแล้ว");
        }
      }

      if (action == "postpone") {
        if (confirm("ต้องการเลื่อนนัดรายงานนี้ใช่หรือไม่")) {
          fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: parseInt(this.$route.params.id),
              Status: "S5",
              EmployeeId: parseInt(this.empId),
            }),
          });
          fetch(`${process.env.VUE_APP_API_URL}/employee/selectedPlanFixDate`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              EngageId: parseInt(this.$route.params.id),
              SelectedDate: "date2",
            }),
          });
          alert("ทำการเลื่อนนัดรายงานแล้ว");
        }
      }

      if (action == "review") {
        // if (confirm("ต้องการสำเร็จรายงานนี้ใช่หรือไม่")) {
        //   fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
        //     method: "PUT",
        //     headers: {
        //       "content-Type": "application/json",
        //       Authorization: `Bearer ${this.token}`,
        //     },
        //     body: JSON.stringify({
        //       ReportId: parseInt(this.$route.params.id),
        //       Status: "S7",
        //       EmployeeId: parseInt(this.empId),
        //     }),
        //   });
        //   alert("รายงานนี้เสร็จสิ้นแล้ว!!");
        // }
        this.showReviewModal = true;
      }

      if (action == "delete") {
        if (confirm("ต้องการลบรายงานนี้ใช่หรือไม่")) {
          fetch(`${process.env.VUE_APP_API_URL}/employee/deleteReportById`, {
            method: "DELETE",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              ReportId: this.reportDetail.reportId,
            }),
          });
          alert("ทำการลบรายงานแล้ว");
          this.$router.push(`/dashboard/report`);
        }
      }
    },
    async getReportDetail() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reportById`,
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
    },
    async getAllReportEngage() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reportEngageByReportId/${this.reportDetail.reportId}`,
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
    updateStatusFromSelectedDate() {
      fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          ReportId: parseInt(this.$route.params.id),
          Status: "S4",
          EmployeeId: parseInt(this.empId),
        }),
      });
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
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
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
