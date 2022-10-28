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
      <div
        class="w-full xl:w-3/4 px-16 xse:px-32 mx-auto flex flex-col justify-start"
      >
        <div
          v-for="(status, i) in activateStatus"
          :key="i"
          class="flex flex-row items-center pt-8 -mb-2 relative"
        >
          <div
            v-show="status.divider"
            class="w-1 h-10 absolute ml-2 top-1 z-20 bg-rangmod-light-yellow"
          ></div>
          <div
            v-show="status.isActive"
            class="w-5 h-5 rounded-full bg-rangmod-light-yellow"
          ></div>
          <div v-show="status.isActive" class="px-3 text-base">
            {{ status.th }} ({{ dateShowFormat(status.createdAt) }})
          </div>
        </div>
      </div>
    </div>
    <hr class="my-12 border-rangmod-purple" />
    <!-- <ReportForm :report="reportDetail"/> -->
    <div class="w-full xl:w-3/4 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-6">
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

          <div v-if="this.reportDetail.engageId">
            <div class="text-rangmod-black">วันและเวลาที่นัด</div>

            <div class="flex flex-col">
              <div
                v-for="(engageDate, i) in reportEngageDate"
                :key="i"
                class="flex flex-row space-x-4 justify-start items-center"
              >
                <div class="mb-5 w-3/5">
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

                <div class="w-7">
                  <div
                    v-if="
                      this.reportDetail.status != 'S6' &&
                      this.reportDetail.status != 'S7' 
                    "
                    @click="
                      (showPostpone = !showPostpone),
                        (modalBg = !modalBg),
                        (newEngage = engageDate.ogdatetime)
                    "
                    class="w-7 h-7 rounded-full"
                    :class="
                      engageDate.ogdatetime == reportDetail.selectedDate
                        ? 'bg-rangmod-green'
                        : 'bg-rangmod-gray cursor-pointer transition-all hover:border-rangmod-green hover:border-4 hover:bg-rangmod-green/75'
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.reportDetail.status != 'waiting'"
          class="border border-rangmod-purple rounded-3xl h-fit px-10"
        >
          <div class="hidden md:flex flex-col justify-start w-full">
            <div class="text-rangmod-purple my-5">ข้อมูลช่าง</div>
            <div class="w-full">
              <div class="text-rangmod-black">ชื่อ-นามสกุล</div>
              <div class="mb-5">
                <div
                  class="flex justify-between items-center w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
                >
                  <div>
                    {{ assignedMaintainer.fname }}
                    {{ assignedMaintainer.lname }}
                  </div>
                </div>
              </div>
            </div>
            <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
            <div class="mb-5">
              <div
                class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider bg-rangmod-light-gray"
              >
                {{ assignedMaintainer.phone }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="this.isEngageDateNow"
        class="flex flex-row space-x-4 justify-end"
      >
        <div
          v-if="this.isEngageDateNow"
          @click="this.showFinish = !this.showFinish, this.modalBg = !this,modalBg"
          class="w-48 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-green shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-green hover:text-rangmod-green hover:shadow-none"
        >
          แก้ไขปัญหาเสร็จสิ้น
        </div>
      </div>
      <div class="flex justify-end space-x-4">
        <div
          class="ml-auto grid grid-cols-2 gap-1 justify-items-end md:flex justify-end md:space-x-4"
        >
          <div
            @click="showCancel = !showCancel"
            v-if="!this.isEngageDateNow"
            class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 text-white bg-rangmod-light-red shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
          >
            ยกเลิกนัด
          </div>
        </div>
      </div>

      <div
        :class="
          modalBg
            ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
            : 'hidden opacity-0'
        "
        v-on:click="modalBg = !modalBg"
      ></div>

      <transition name="bounce">
        <div
          v-show="showPostpone"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div
                @click="(showPostpone = false), (modalBg = false)"
                class="cursor-pointer"
              >
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
            <div v-if="reportDetail.selectedDate != ''">
              <div class="text-2xl text-rangmod-purple mb-5">เลื่อนนัด</div>
              <div class="text-rangmod-black">หัวข้อปัญหา</div>
              <div class="mb-5">
                <input
                  v-model="reportDetail.title"
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="text-rangmod-black">รายละเอียดปัญหา</div>
              <div class="mb-5">
                <textarea
                  v-model="reportDetail.reportDes"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                ></textarea>
              </div>

              <div class="w-full">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลาที่นัด</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ engageDateTimeShowFormat(oldEngage) }}
                  </div>
                </div>
              </div>
              <div>วันเลื่อนนัดครั้งถัดไป</div>
              <div class="flex flex-col">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลาที่นัด</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ engageDateTimeShowFormat(newEngage) }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row space-x-4 justify-end">
                <div
                  @click="(showPostpone = false), (modalBg = false)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-red text-rangmod-red hover:bg-rangmod-red hover:border-white hover:text-white hover:shadow-none"
                >
                  ยกเลิก
                </div>
                <div
                  @click="postpone(newEngage)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
                >
                  เลื่อนนัด
                </div>
              </div>
            </div>

            <div v-else>
              <div class="text-2xl text-rangmod-purple mb-5">เลือกวันนัด</div>
              <div class="text-rangmod-black">หัวข้อปัญหา</div>
              <div class="mb-5">
                <input
                  v-model="reportDetail.title"
                  type="text"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                />
              </div>

              <div class="text-rangmod-black">รายละเอียดปัญหา</div>
              <div class="mb-5">
                <textarea
                  v-model="reportDetail.reportDes"
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  readonly
                ></textarea>
              </div>

              <div class="w-full">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลาที่นัด</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ engageDateTimeShowFormat(newEngage) }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row space-x-4 justify-end">
                <div
                  @click="(showPostpone = false), (modalBg = false)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-red text-rangmod-red hover:bg-rangmod-red hover:border-white hover:text-white hover:shadow-none"
                >
                  ยกเลิก
                </div>
                <div
                  @click="postpone(newEngage)"
                  class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
                >
                  นัดซ่อม
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showFinish"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div @click="showFinish = false, modalBg = false" class="cursor-pointer">
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
                v-model="reportDetail.title"
                type="text"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              />
            </div>

            <div class="text-rangmod-black">รายละเอียดปัญหา</div>
            <div class="mb-5">
              <textarea
                v-model="reportDetail.reportDes"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              ></textarea>
            </div>

            <div class="flex flex-col">
              <div class="w-full">
                <div class="mb-5">
                  <div class="text-rangmod-black">ว/ด/ป เวลา</div>
                  <div
                    class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                  >
                    {{ engageDateTimeShowFormat(oldEngage) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-row space-x-4 justify-end">
              <div
                v-on:click="openReview()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                แก้ไขปัญหาเสร็จสิ้น
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showCancel"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div @click="showCancel = false" class="cursor-pointer">
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
                v-model="reportDetail.title"
                type="text"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              />
            </div>

            <div class="text-rangmod-black">รายละเอียดปัญหา</div>
            <div class="mb-5">
              <textarea
                v-model="reportDetail.reportDes"
                class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
              ></textarea>
            </div>

            <div class="w-full">
              <div class="mb-5">
                <div class="text-rangmod-black">ว/ด/ป เวลาที่นัด</div>
                <div
                  class="w-full bg-rangmod-light-gray border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                >
                  {{ engageDateTimeShowFormat(oldEngage) }}
                </div>
              </div>
            </div>

            <div class="flex flex-row space-x-4 justify-end">
              <div
                @click="cancel()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center border-2 shadow-sm cursor-pointer transition-all border-rangmod-red text-rangmod-red hover:bg-rangmod-red hover:border-white hover:text-white hover:shadow-none"
              >
                ยกเลิกนัด
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-show="showReviewModal"
          class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
        >
          <div
            class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
          >
            <!-- Closed -->
            <div class="flex justify-end">
              <div @click="showReviewModal = false, modalBg = false" class="cursor-pointer">
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
              ให้คะแนน / ความคิดเห็น
            </div>

            <div class="flex flex-row space-x-4 justify-center mb-5">
              <div v-for="(rate, i) in rates" :key="i">
                <div
                  @click="scored(rate.score)"
                  class="cursor-pointer"
                  :class="
                    rate.hover || rate.isActive ? 'text-rangmod-yellow' : ''
                  "
                >
                  <svg
                    @mouseover="fillStar(rate.score)"
                    @mouseleave="removeStar()"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    class="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    ></path>
                  </svg>
                </div>
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
                @click="reviewReport()"
                class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <transition name="bounce">
      <div
        v-if="showPostpone"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-3 py-8 rounded-xl shadow-xl"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            เลื่อนนัด
          </div>
          <div
            class="flex flex-col text-lg text-rangmod-purple my-5 text-center"
          >
            <div>ต้องการเลื่อนนัดเป็น</div>
            <div class="rounded-full mx-auto px-2 bg-rangmod-gray text-white">
              {{ engageDateTimeShowFormat(newEngage) }}
            </div>
          </div>
          <div class="flex flex-row space-x-4 justify-center">
            <div
              @click="(showPostpone = false), (modalBg = false)"
              class="w-32 my-4 py-2 text-lg text-center rounded-full cursor-pointer transition-all text-rangmod-red hover:shadow-lg"
            >
              ยกเลิก
            </div>
            <div
              @click="postpone(newEngage)"
              class="w-32 my-4 py-2 text-lg text-center rounded-full cursor-pointer transition-all text-rangmod-purple hover:shadow-lg"
            >
              ยืนยัน
            </div>
          </div>
        </div>
      </div>
    </transition> -->
    <transition name="bounce">
      <div
        v-if="isPostpone"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-xs min-w-[320px] h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการเลือกวันนัดซ่อมสำเร็จ
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="accepted"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการรับเรื่องรายงานแล้ว
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="isCancel"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการรับเรื่องรายงานแล้ว
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="isReview"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10"
      >
        <div
          class="w-fit h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ทำการให้คะแนนและแสดงความคิดเห็นแล้ว
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      createdBy: localStorage.getItem("id"),
      reportDetail: {},
      modalBg: false,
      showModal: false,
      showFinish: false,
      showCancel: false,
      showPostpone: false,
      showReviewModal: false,
      showCancelModal: false,
      isPostpone: false,
      isCancel: false,
      isReview: false,
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
          name: "รอยืนยันการเลื่อนนัดซ่อม",
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
      reportById: {},
      reportEngageDate: [
        {
          date: "date1",
          datetime: "",
          ogdatetime: "",
          isActive: false,
        },
        {
          date: "date2",
          datetime: "",
          ogdatetime: "",
          isActive: false,
        },
        {
          date: "date3",
          datetime: "",
          ogdatetime: "",
          isActive: false,
        },
        {
          date: "date4",
          datetime: "",
          ogdatetime: "",
          isActive: false,
        },
      ],
      assignedMaintainer: {},
      isEngageDateNow: false,
      rates: [
        {
          star: 1,
          score: 1,
          hover: false,
          isActive: false,
        },
        {
          star: 2,
          score: 2,
          hover: false,
          isActive: false,
        },
        {
          star: 3,
          score: 3,
          hover: false,
          isActive: false,
        },
        {
          star: 4,
          score: 4,
          hover: false,
          isActive: false,
        },
        {
          star: 5,
          score: 5,
          hover: false,
          isActive: false,
        },
      ],
      review: {
        score: 0,
        description: "",
      },
      goback: "<",
      activateStatus: [],
      newEngage: "",
      oldEngage: "",
    };
  },
  // computed: {

  // },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getReportEngageWithReport();
      await this.getAllReportStatus(this.$route.params.id);
      this.isEngageDateNow =
        this.engageDateShowFormat(this.reportDetail.selectedDate) ==
        this.dateShowFormat(Date.now());

      if (this.reportDetail.selectedDate != "") {
        this.oldEngage = this.reportDetail.selectedDate;
      }
      await this.getAllReportStatus(this.$route.params.id);
    },
    async getReportById() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reportById`,
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
    async getReportEngageWithReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/getReportEngageWithReport/?reportId=${this.$route.params.id}`,
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
          this.reportDetail = await this.getReportById();
        } else {
          this.reportDetail = data;
          this.reportEngageDate[0].datetime = this.engageShowFormat(
            this.reportDetail.date1
          );
          this.reportEngageDate[1].datetime = this.engageShowFormat(
            this.reportDetail.date2
          );
          this.reportEngageDate[2].datetime = this.engageShowFormat(
            this.reportDetail.date3
          );
          this.reportEngageDate[3].datetime = this.engageShowFormat(
            this.reportDetail.date4
          );
          this.reportEngageDate[0].ogdatetime = this.reportDetail.date1;
          this.reportEngageDate[1].ogdatetime = this.reportDetail.date2;
          this.reportEngageDate[2].ogdatetime = this.reportDetail.date3;
          this.reportEngageDate[3].ogdatetime = this.reportDetail.date4;
          await this.getAssignedMaintainer(data.maintainerId);
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
      const data = res.json();
      return data.then((data) => {
        if (data.maintainerId != 0) {
          this.assignedMaintainer = data;
        }
      });
    },
    engageShowFormat(engage) {
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      const showTime = res[1].split("Z");
      return showDate + " " + showTime[0];
    },
    async getAllReportStatus(reportId) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/reportStatusApplication/${reportId}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((data) => {
        this.activateStatus = data.Profile;
        for (let i in this.activateStatus) {
          for (let j in this.statusList) {
            if (this.activateStatus[i].status == this.statusList[j].eng) {
              this.activateStatus[i].th = this.statusList[j].name;
            }
          }
          this.activateStatus[i].isActive = true;
          this.activateStatus[i].divider = true;
          this.activateStatus[0].divider = false;
        }
      });
    },
    pad(number) {
      return number < 10 ? "0" + number.toString() : number.toString();
    },
    async postpone(datetime) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/selectedPlanFixDate`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            engageId: parseInt(this.reportDetail.engageId),
            selectedDate: this.postponeFormat(datetime),
            updateBy: parseInt(this.createdBy),
          }),
        }
      );
      const data = res.json();
      return data.then(async (data) => {
        if (data.message == "success") {
          await this.updateStatus("S8");
          await this.reloadData()
          this.isPostpone = true;
          setTimeout(() => {
            this.isPostpone = false;
          }, 2000);
          setTimeout(() => {
            this.showPostpone = false;
            this.modalBg = false;
          }, 3000);
        } else {
          alert("error");
        }
      });
    },
    async cancel() {
      const res = await this.updateStatus("S9");
      if (res == "success") {
        await this.reloadData()
        this.isCancel = true;
        setTimeout(() => {
            this.isCancel = false;
          }, 2000);
        setTimeout(() => {
          this.showCancel = false;
          this.modalBg = false;
        }, 2500);
      } else {
        alert("error");
      }
    },
    async finish() {
      const res = this.updateStatus("S7");
      if (res == "success") {
        alert("success");
      }
    },
    postponeFormat(datetime) {
      const res = datetime.split("T");
      const res2 = res[1].split("Z");
      return res[0] + " " + res2[0];
    },
    async updateStatus(status) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/statusReport`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Status: status,
            UpdateBy: parseInt(this.createdBy),
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
    dateShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return formatedDate;
    },
    engageDateShowFormat(engage) {
      const res = engage.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
    },
    engageDateTimeShowFormat(engage) {
      if (engage == "") {
        return "";
      } else {
        const res = engage.split("T");
        const dateRes = res[0].split("-");
        const showDate =
          dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
        const showTime = res[1].split("Z");
        return showDate + " " + showTime[0];
      }
    },
    fillStar(score) {
      for (let i = 0; i < score; i++) {
        this.rates[i].hover = true;
      }
    },
    removeStar() {
      for (let i in this.rates) {
        this.rates[i].hover = false;
      }
    },
    scored(score) {
      if (this.rates[score - 1].isActive == true) {
        for (let i in this.rates) {
          this.rates[i].isActive = false;
        }
        this.review.score = 0;
      } else {
        for (let i in this.rates) {
          if (i < score) {
            this.rates[i].isActive = true;
          } else {
            this.rates[i].isActive = false;
          }
        }
        this.review.score = score;
      }
    },
    openReview() {
      this.showFinish = !this.showFinish
      setTimeout(() => {
        this.showReviewModal = !this.showReviewModal
      }, 500)
      
    },
    async reviewReport() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/customer/endJobReview`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            ReportId: parseInt(this.$route.params.id),
            Des: this.review.description,
            Score: this.review.score,
            UpdateBy: parseInt(this.createdBy),
          }),
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.message == "success") {
          this.isReview = true
          setTimeout(() => {
            this.isReview = false
          },2000)
          setTimeout(() => {
            this.showReviewModal = false
            this.modalBg = false
          },2500)
          return "success";
        } else {
          return "fail";
        }
      });
    },
    async reloadData() {
      await this.getReportEngageWithReport();
      await this.getAllReportStatus(this.$route.params.id);
    },
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
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
