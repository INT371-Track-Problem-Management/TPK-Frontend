<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">รายละเอียดและสถานะ report folder</div>
    <hr class="my-4 border-rangmod-purple" />

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

    <RepairForm :code="code" />

    <!-- CODE: {{code}} -->
  </div>
</template>

<script>
import RepairForm from "@/components/report/RequestForm.vue";

export default {
  components: { RepairForm },

  props: ["code"],

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

      activeSortFilter: false,

      sortList: [
        { key: "id", name: "รหัสรายงาน" },
        { key: "room", name: "ห้อง" },
        { key: "request_date", name: "ว/ด/ป แจ้งซ่อม" },
      ],

      requestStatusList: [
        {
          id: "1",
          color: "text-rangmod-blue",
          bgcolor: "bg-rangmod-blue/20",
          title: "รอรับเรื่อง",
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          bgcolor: "bg-rangmod-yellow/20",
          title: "รอดำเนินการ",
        },
        {
          id: "3",
          color: "text-rangmod-green",
          bgcolor: "bg-rangmod-green/20",
          title: "ดำเนินการแล้ว",
        },
        {
          id: "4",
          color: "text-rangmod-purple",
          bgcolor: "bg-rangmod-purple/20",
          title: "เลื่อนนัด",
        },
        {
          id: "5",
          color: "text-rangmod-red",
          bgcolor: "bg-rangmod-red/20",
          title: "ยกเลิก",
        },
      ],

      requestList: [
        {
          id: "ED123456",
          room: "201",
          title: "น้ำไม่ไหล",
          desc: "น้ำไม่ไหล DESC ",
          status: "3",
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
          ],
        },
        {
          id: "ED654321",
          room: "102",
          title: "ไฟไม่ติด",
          desc: "ไฟไม่ติด DESC ",
          status: "2",
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
          ],
        },
        {
          id: "ED789101",
          room: "203",
          title: "น้ำรั่ว",
          desc: "น้ำรั่ว DESC ",
          status: "5",
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
          ],
        },
        {
          id: "ED786123",
          room: "203",
          title: "ปลวกขึ้น",
          desc: "ปลวกขึ้น DESC ",
          status: "4",
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
          ],
        },
        {
          id: "ED543210",
          room: "201",
          title: "โต๊ะพัง",
          desc: "โต๊ะพัง DESC ",
          status: "1",
          request_date: "29/03/2565",
          repair_date: [
            {
              date: "31/03/2565",
              isActive: true,
              remark: "เหตุผลครั้งที่ 1",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
            {
              date: "",
              isActive: false,
              remark: "",
            },
          ],
        },
      ],
    };
  },

  methods: {
    doFilter(id) {
      console.log(`Filtered by ${id} !`);
    },
    doSort(id) {
      console.log(`Sorted by ${id} !`);
    },
  },
};
</script>

<style></style>
