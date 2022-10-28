<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="flex items-center">
      <div
        @click="this.$router.back()"
        class="cursor-pointer hover:font-bold mx-4"
      >
        {{ this.goback }}
      </div>
      <div class="text-xl">รายละเอียดและสถานะ</div>
    </div>
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
        class="w-full xl:w-3/4 px-16 xse:px-32 mx-auto flex flex-col justify-start"
      >
        <div
          v-for="(status, i) in activateStatus"
          :key="i"
          class="flex flex-row items-center pt-8 -mb-2 relative"
        >
          <!-- <div v-show="status.isActive"> -->
          <div
            v-show="status.divider"
            class="w-1 h-10 absolute ml-2 top-1 z-20 bg-rangmod-light-yellow"
          ></div>
          <div
            v-show="status.isActive"
            class="w-5 h-5 rounded-full bg-rangmod-light-yellow"
          ></div>
          <div v-show="status.isActive" class="px-3 text-base">
            {{ status.th }} ({{ dateShowFormat(status.createdAt)}})
          </div>
          <!-- </div> -->

          <!-- <div
            v-show="status.divider"
            class="w-1 h-10 absolute ml-2 bottom-1 z-20 bg-rangmod-light-yellow"
          ></div> -->
        </div>
      </div>
    </div>
    <hr class="my-12 border-rangmod-purple" />
    <!-- <RepairForm :report="reportById"/> -->
    <div class="w-full xl:w-4/5 mx-auto mb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-10">
        <div class="flex flex-col justify-start">
          <div class="text-rangmod-black">หัวข้อปัญหา sad</div>
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
                <div class="mb-5 w-3/5">
                  <div class="text-rangmod-black">
                    ว/ด/ป เวลาที่นัด ครั้งที่ {{ i + 1 }}
                  </div>
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

                <div
                  v-if="this.reportDetail.status != 'waiting' && engageDate.ogdatetime == this.reportDetail.selectedDate"
                  class="w-7"
                >
                  <div class="w-7 h-7 rounded-full bg-rangmod-green"></div>
                </div>
                <div v-if="engageDate.incorrectDate" class="w-fit">
                  <div class="text-rangmod-red font-primary text-base">
                    * กรุณาใส่วันนัดซ่อม
                  </div>
                </div>
                <div
                  v-if="engageDate.ivlDate && engageDate == reportEngageDate[0]"
                  class="w-fit"
                >
                  <div class="text-rangmod-red font-primary text-base">
                    * ห้ามนัดซ่อมวันนี้
                  </div>
                </div>
                <div v-else-if="engageDate.ivlDate" class="w-fit">
                  <div class="text-rangmod-red font-primary text-base">
                    * กรุณาเปลี่ยนวันซ่อม
                  </div>
                </div>
                <div v-if="isCorrectAllDate" class="text-rangmod-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    class="bi bi-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-rangmod-purple rounded-3xl h-fit px-10">
          <transition name="bounce">
            <div
              v-show="addedMaintainer"
              class="flex justify-end relative text-white"
            >
              <div
                class="z-50 w-fit py-2 px-4 mt-4 rounded-3xl absolute bg-rangmod-purple divide-y divide-rangmod-light-gray"
              >
                เพิ่มช่างสำเร็จ
              </div>
            </div>
          </transition>
          <div class="hidden md:flex flex-col justify-start w-full">
            <div class="text-rangmod-purple my-5">ข้อมูลช่าง</div>
            <div v-if="!isEdit" class="flex flex-row space-x-4 w-full">
              <div class="w-full">
                <div class="text-rangmod-black">ชื่อ-นามสกุล</div>
                <div class="mb-5">
                  <div v-if="this.reportDetail.status == 'waiting'"
                    @click="isActiveMaintainer = !isActiveMaintainer"
                    class="flex justify-between items-center cursor-pointer w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    :class="isEdit ? '' : 'bg-rangmod-light-gray'"
                  >
                    <div>
                      {{ selectedMaintainer.fname }}
                      {{ selectedMaintainer.lname }}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                      :class="
                        isActiveMaintainer
                          ? 'transition-all rotate-180'
                          : 'transition-all'
                      "
                    >
                      <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                      />
                    </svg>
                  </div>
                  <div v-if="this.reportDetail.status != 'waiting'"
                    class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                  >
                    <div>
                      {{ assignedMaintainer.fname }}
                      {{ assignedMaintainer.lname }}
                    </div>
                  </div>
                  <transition name="bounce">
                    <div
                      v-show="isActiveMaintainer"
                      class="flex flex-row-reverse relative"
                    >
                      <div
                        class="z-50 max-h-96 w-full overflow-auto no-scrollbar py-2 px-4 mt-4 origin-center border-2 border-rangmod-light-gray rounded-3xl absolute bg-white divide-y divide-rangmod-light-gray"
                      >
                        <div
                          v-for="(maintainer, i) in maintainerLists"
                          :key="i"
                        >
                          <div
                            class="py-2 hover:font-bold text-left cursor-pointer"
                            @click="
                              (this.selectedMaintainer = maintainer),
                                (isActiveMaintainer = false),
                                test()
                            "
                          >
                            {{ maintainer.fname }} {{ maintainer.lname }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <div v-else class="flex flex-row justify-between w-full">
              <div class="w-1/2 mr-1">
                <div class="flex flex-row">
                  <div class="text-rangmod-black">ชื่อ </div>
                  <div v-if="ivlMaintainer.fname" class="text-rangmod-red"> *กรุณาใส่ชื่อ</div>
                </div>
                
                <div class="mb-5">
                  <input
                    v-model="this.maintainer.fname"
                    type="text"
                    class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                    :class="isEdit ? '' : 'bg-rangmod-light-gray'"
                  />
                </div>
              </div>
              <div class="w-1/2 ml-1">
                <div class="flex flex-row">
                  <div class="text-rangmod-black">นามสกุล </div>
                  <div v-if="ivlMaintainer.lname" class="text-rangmod-red"> *นามสกุล</div>
                </div>
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
            <div class="flex flex-row">
                  <div class="text-rangmod-black">เบอร์ติดต่อช่าง </div>
                  <div v-if="ivlMaintainer.phone" class="text-rangmod-red"> *กรุณาใส่เบอร์ติดต่อช่าง</div>
                </div>
                <div v-if="this.reportDetail.status != 'waiting'" class="mb-5">
              <div
                class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
              >
                {{ assignedMaintainer.phone }}
              </div>
            </div>
            <div v-else-if="!isEdit" class="mb-5">
              <div
                class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                :class="isEdit ? '' : 'bg-rangmod-light-gray'"
              >
                {{ selectedMaintainer.phone }}
              </div>
            </div>
            <div v-else class="mb-5">
              <input
                maxlength="10"
                v-model="this.maintainer.phone"
                type="text"
                class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                :class="isEdit ? '' : 'bg-rangmod-light-gray'"
              />
            </div>
          </div>
          <div
            v-if="!isEdit && this.reportDetail.status == 'waiting'"
            @click="isEdit = !isEdit"
            class="float-right w-28 mb-5 py-2 text-lg rounded-full text-center border-2 text-rangmod-black bg-rangmod-light-yellow shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
          >
            แก้ไข
          </div>
          <div
            v-if="isEdit && this.reportDetail.status == 'waiting'"
            @click="addMaintainer()"
            class="float-right w-28 mb-5 py-2 text-lg rounded-full text-center border-2 text-rangmod-black bg-rangmod-light-yellow shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
          >
            บันทึก
          </div>
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
            v-if="this.reportDetail.status == 'defer'"
            @click="actionButton('defer')"
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            ยืนยันเลื่อนนัด
          </div>
          <div
            v-if="this.reportDetail.status == 'pending'"
            @click="actionButton('pending')"
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-red hover:text-rangmod-red hover:shadow-none"
          >
            ยืนยันยกเลิกนัด
          </div>
        </div>
        <div
          v-if="!this.isAccept"
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      empId: localStorage.getItem("id"),
      oneDayTime: 86400000,
      currentDay: Date.now(),
      addedMaintainer: false,
      isActiveMaintainer: false,
      isAccept: false,
      isEdit: false,
      reportDetail: {},
      reportEngage: {},
      maintainerLists: [],
      maintainer: {
        id: 0,
        fname: "",
        lname: "",
        phone: "",
      },
      ivlMaintainer: {
        fname: false,
        lname: false,
        phone: false,
      },
      selectedMaintainer: {},
      assignedMaintainer: {},
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
          divider: true,
          isActive: true,
        },
        {
          id: 3,
          eng: "engage",
          name: "นัดวันเข้าซ่อม",
          divider: true,
          isActive: true,
        },
        {
          id: 4,
          eng: "prepare",
          name: "รอดำเนินการ",
          divider: true,
          isActive: true,
        },
        {
          id: 5,
          eng: "postpone",
          name: "เลื่อนนัด",
          divider: true,
          isActive: true,
        },
        {
          id: 6,
          eng: "cancel",
          name: "ยกเลิกนัด",
          divider: true,
          isActive: true,
        },
        {
          id: 7,
          eng: "success",
          name: "เสร็จสิ้น",
          divider: true,
          isActive: true,
        },
        {
          id: 8,
          eng: "defer",
          name: "รอยืนยันวันนัดซ่อม",
          divider: true,
          isActive: true,
        },
        {
          id: 9,
          eng: "pending",
          name: "รอยืนยันการยกเลิก",
          divider: true,
          isActive: true,
        },
      ],
      activateStatus: [],
      reportEngageDate: [
        {
          date: "date1",
          datetime: "",
          ogdatetime: "",
          isActive: true,
          incorrectDate: false,
          ivlDate: false,
        },
        {
          date: "date2",
          datetime: "",
          ogdatetime: "",
          isActive: false,
          incorrectDate: false,
          ivlDate: false,
        },
        {
          date: "date3",
          datetime: "",
          ogdatetime: "",
          isActive: false,
          incorrectDate: false,
          ivlDate: false,
        },
        {
          date: "date4",
          datetime: "",
          ogdatetime: "",
          isActive: false,
          incorrectDate: false,
          ivlDate: false,
        },
      ],
      goback: "<",
      isCorrectAllDate: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.reportEngageByReportId();
      this.checkAccept();
      this.maintainerLists = await this.getMaintainer();
      this.selectedMaintainer = this.maintainerLists[0];
      await this.getAllReportStatus(this.$route.params.id)
      // if(this.engageDateShowFormat(this.reportDetail.selectedDate) == this.dateShowFormat(Date.now())) {
      //   const res = await this.updateStatus('S4')
      //   console.log(res);
      //   if(res == 'success') {
      //     await this.getAllReportStatus(this.$route.params.id)
      //   }
      // }
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
    async reportEngageByReportId() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reportEngageByReportId/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then(async (data) => {
        if (data.engageId == 0) {
          this.reportDetail = await this.getReportDetail();
        } else {
          this.reportDetail = await this.getReportDetail()
          this.reportEngage = data;
          this.reportEngageDate[0].datetime = this.engageShowFormat(this.reportEngage.date1)
          this.reportEngageDate[1].datetime = this.engageShowFormat(this.reportEngage.date2)
          this.reportEngageDate[2].datetime = this.engageShowFormat(this.reportEngage.date3)
          this.reportEngageDate[3].datetime = this.engageShowFormat(this.reportEngage.date4)
          this.reportEngageDate[0].ogdatetime = this.reportEngage.date1
          this.reportEngageDate[1].ogdatetime = this.reportEngage.date2
          this.reportEngageDate[2].ogdatetime = this.reportEngage.date3
          this.reportEngageDate[3].ogdatetime = this.reportEngage.date4
          await this.getAssignedMaintainer(data.maintainerId)
        }
      });
    },
    async getAssignedMaintainer(maintainerId) {
      const res = await fetch(
              `${process.env.VUE_APP_API_URL}/service/maintainerById/${maintainerId}`,
              {
                method: "GET",
                headers: {
                  "content-Type": "application/json",
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            const data = res.json()
            return data.then((data) => {
              if(data.maintainerId != 0) {
                this.assignedMaintainer = data
              }
            })
    },
    async addMaintainer() {
      this.ivlMaintainer.fname = this.maintainer.fname == "" ? true : false;
      this.ivlMaintainer.lname = this.maintainer.lname == "" ? true : false;
      this.ivlMaintainer.phone = this.maintainer.phone == "" ? true : false;
      if (
        this.ivlMaintainer.fname ||
        this.ivlMaintainer.lname ||
        this.ivlMaintainer.phone
      ) {
        setTimeout(() => {
          this.ivlMaintainer.fname = false;
          this.ivlMaintainer.lname = false;
          this.ivlMaintainer.phone = false;
        }, 2000);
      } else {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/maintainer`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              Fname: this.maintainer.fname,
              Lname: this.maintainer.lname,
              Phone: this.maintainer.phone,
              UpdateBy: parseInt(this.empId),
            }),
          }
        );
        const data = res.json();
        return data.then(async (data) => {
          if (data.message == "success") {
            const res2 = await fetch(
              `${process.env.VUE_APP_API_URL}/service/maintainerById/${data.maintainerId}`,
              {
                method: "GET",
                headers: {
                  "content-Type": "application/json",
                  Authorization: `Bearer ${this.token}`,
                },
              }
            );
            const data2 = res2.json();
            return data2.then((data2) => {
              if (data2.maintainerId != 0) {
                this.maintainerLists.push(data2);
                this.selectedMaintainer = data2;
                this.addedMaintainer = true;
                setTimeout(() => {
                  this.addedMaintainer = false;
                  this.isEdit = !this.isEdit;
                }, 1000);
              }
            });
          }
        });
      }
    },
    async getMaintainer() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/maintainerList`,
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
    async createEngage() {
      console.log(this.reportEngageDate);
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/CreateReportEngage`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            Date1: this.reportEngageDate[0].datetime,
            Date2: this.reportEngageDate[1].datetime,
            Date3: this.reportEngageDate[2].datetime,
            Date4: this.reportEngageDate[3].datetime,
            ReportId: parseInt(this.$route.params.id),
            BuildingId: parseInt(this.reportDetail.buildingId),
            UpdateBy: parseInt(this.empId), 
            SelectedBy: parseInt(this.reportDetail.createdBy),
          }),
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (typeof data === "number") {
          return "success";
        } else {
          return "fail";
        }
      });
    },
    async assignMaintainer() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/assignFixReport`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            AssignDate: Date.now(),
            MaintainerId: this.selectedMaintainer.maintainerId,
            EmployeeId: parseInt(this.empId),
            ReportId: parseInt(this.$route.params.id),
          }),
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.message == "success") {
          return "success";
        } else {
          return "fail";
        }
      });
    },
    async actionButton(action) {
      if (action == "accept") {
        for (let engage in this.reportEngageDate) {
          console.log(
            this.dateShowFormat(this.reportEngageDate[engage].datetime)
          );
          if (this.reportEngageDate[engage].datetime == "") {
            this.reportEngageDate[engage].incorrectDate = true;
          }
        }
        if (
          this.reportEngageDate[0].incorrectDate ||
          this.reportEngageDate[1].incorrectDate ||
          this.reportEngageDate[2].incorrectDate ||
          this.reportEngageDate[3].incorrectDate
        ) {
          for (let i in this.reportEngageDate) {
            setTimeout(() => {
              this.reportEngageDate[i].incorrectDate = false;
            }, 2000);
          }
        } else {
          if (this.checkEngage() != "success") {
            for (let i in this.reportEngageDate) {
              setTimeout(() => {
                this.reportEngageDate[i].ivlDate = false;
              }, 2000);
            }
          } else {
            this.isCorrectAllDate = true;
            setTimeout(() => {
              this.isCorrectAllDate = false;
            }, 2000);
            console.log("all date ok");
            const res1 = await this.createEngage();
            console.log(res1);
            if (res1 == "success") {
              const res2 = await this.assignMaintainer();
              console.log(res2);
              if (res2 == "success") {
                await this.updateStatus("S2");
              }
            }
          }
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
          alert("ทำการยกเลิกนัดรายงานแล้ว");
        }
      }

      // if (action == "postpone") {
      //   if (confirm("ต้องการเลื่อนนัดรายงานนี้ใช่หรือไม่")) {
      //     fetch(`${process.env.VUE_APP_API_URL}/employee/statusReport`, {
      //       method: "PUT",
      //       headers: {
      //         "content-Type": "application/json",
      //         Authorization: `Bearer ${this.token}`,
      //       },
      //       body: JSON.stringify({
      //         ReportId: parseInt(this.$route.params.id),
      //         Status: "S5",
      //         EmployeeId: parseInt(this.empId),
      //       }),
      //     });
      //     fetch(`${process.env.VUE_APP_API_URL}/employee/selectedPlanFixDate`, {
      //       method: "PUT",
      //       headers: {
      //         "content-Type": "application/json",
      //         Authorization: `Bearer ${this.token}`,
      //       },
      //       body: JSON.stringify({
      //         EngageId: parseInt(this.$route.params.id),
      //         SelectedDate: "date2",
      //       }),
      //     });
      //     alert("ทำการเลื่อนนัดรายงานแล้ว");
      //   }
      // }

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

      if(action == 'defer') {
        this.updateStatus('S5')
      }

      if(action == 'pending') {
        this.updateStatus('S6')
      }
    },
    async getAllReportStatus(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/reportStatusApplication/${reportId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json()
      return data.then((data) => {
        this.activateStatus = data.Profile
        for(let i in this.activateStatus) {
          for(let j in this.statusList) {
            if(this.activateStatus[i].status == this.statusList[j].eng) {
              this.activateStatus[i].th = this.statusList[j].name
            }
          }
          this.activateStatus[i].isActive = true
          this.activateStatus[i].divider = true
          this.activateStatus[0].divider = false
        }
        console.log(this.activateStatus);
      })
    },
    async updateStatus(status) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/statusReport`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Status: status,
            UpdateBy: parseInt(this.empId),
          }),
        }
      );
      const data = res.json()
      return data.then((data) => {
        if(data == 'Update success') {
          return 'success'
        } else {
          return 'fail'
        }
      })
    },
    checkAccept() {
      this.isAccept = this.reportDetail.status != "waiting";
    },
    checkEngage() {
      const date1 = new Date(this.reportEngageDate[0].datetime);
      const date2 = new Date(this.reportEngageDate[1].datetime);
      const date3 = new Date(this.reportEngageDate[2].datetime);
      const date4 = new Date(this.reportEngageDate[3].datetime);
      if (
        date1 - this.currentDay > 0 &&
        this.dateShowFormat(date1) != this.dateShowFormat(this.currentDay)
      ) {
        if (date2 - date1 >= this.oneDayTime) {
          if (date3 - date2 >= this.oneDayTime) {
            if (date4 - date3 >= this.oneDayTime) {
              return "success";
            } else {
              this.reportEngageDate[3].ivlDate = true;
              return "fail";
            }
          } else {
            this.reportEngageDate[2].ivlDate = true;
            return "fail";
          }
        } else {
          this.reportEngageDate[1].ivlDate = true;
          return "fail";
        }
      } else {
        this.reportEngageDate[0].ivlDate = true;
        return "fail";
      }
    },
    doFilter(id) {
      console.log(`Filtered by ${id} !`);
    },
    doSort(id) {
      console.log(`Sorted by ${id} !`);
    },
    test() {
      console.log(this.selectedMaintainer);
    },
    dateShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return formatedDate;
    },
    timeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedTime = date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      return formatedTime;
    },
    dateTimeShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const formatedTime = date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      return formatedDate + " " + formatedTime;
    },
    engageShowFormat(engage) {
      const res = engage.split('T')
      const dateRes = res[0].split('-')
      const showDate = dateRes[2]+'/'+dateRes[1]+'/'+(parseInt(dateRes[0])+543)
      const showTime = res[1].split('Z')
      return showDate + " " + showTime[0]
    },
    engageDateShowFormat(engage) {
      const res = engage.split('T')
      const dateRes = res[0].split('-')
      const showDate = dateRes[2]+'/'+dateRes[1]+'/'+(parseInt(dateRes[0])+543)
      return showDate
    }
  },
};
</script>

<style></style>
