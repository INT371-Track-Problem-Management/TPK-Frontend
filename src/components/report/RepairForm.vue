<template>
  <div class="w-full xl:w-4/5 mx-auto mb-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-10">
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
            type="text"
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          />
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea
            class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>

        <div class="text-rangmod-black">วันและเวลาที่นัด</div>

        <div class="flex flex-col">
          <div
            v-for="(reminder, i) in date_reminder"
            :key="i"
            class="flex flex-row space-x-4 justify-between items-center"
          >
            <div class="mb-5">
              <div class="text-rangmod-black">ว/ด/ป</div>
              <input
                type="text"
                class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="reminder.date"
              />
            </div>

            <div class="mb-5">
              <div class="text-rangmod-black">เวลา</div>
              <input
                type="text"
                class="w-full bg-rangmod-gray/40 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="reminder.time"
              />
            </div>

            <div class="w-7">
              <div
                class="w-7 h-7 rounded-full"
                :class="
                  reminder.isActive ? 'bg-rangmod-green' : 'bg-rangmod-gray'
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
    </div>

    <div class="flex justify-end space-x-4">
      <div
        class="mx-auto grid grid-cols-2 gap-4 justify-items-center md:flex justify-center xl:justify-end md:space-x-4"
      >
        <div
          @click="actionButton('postpone')"
          class="bg-rangmod-blue w-32 md:w-40 text-center text-white text-lg md:text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
        >
          เลื่อนนัด
        </div>

        <div
          @click="actionButton('accept')"
          class="bg-rangmod-blue w-32 md:w-40 text-center text-white text-lg md:text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
        >
          รับเรื่อง
        </div>

        <div
          @click="actionButton('cancel')"
          class="bg-rangmod-blue w-32 md:w-40 text-center text-white text-lg md:text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
        >
          ยกเลิกนัด
        </div>

        <div
          @click="actionButton('save')"
          class="bg-rangmod-purple w-32 md:w-40 text-center text-white text-lg md:text-xl py-4 rounded-full transition-all cursor-pointer hover:brightness-90"
        >
          บันทึก
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date_reminder: [
        {
          date: "",
          time: "",
          isActive: false,
        },
        {
          date: "",
          time: "",
          isActive: true,
        },
        {
          date: "",
          time: "",
          isActive: false,
        },
        {
          date: "",
          time: "",
          isActive: false,
        },
      ],
    };
  },

  methods: {
    actionButton(action) {
      console.log(action);
    },
  },
};
</script>

<style></style>
