<template>
  <div class="w-1/2 mx-auto my-5">

    <div class="grid grid-cols-2 gap-20 mb-24">

      <div class="flex flex-col justify-start">

        <div class="text-rangmod-black">หัวข้อปัญหา</div>
        <div class="mb-5">
          <input 
            type="text" 
            class="w-full text-xl bg-rangmod-gray/50 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          >
        </div>

        <div class="text-rangmod-black">รายละเอียดปัญหา</div>
        <div class="mb-5">
          <textarea 
            class="w-full text-xl bg-rangmod-gray/50 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            readonly
          ></textarea>
        </div>

        <div class="text-rangmod-black">วันและเวลาที่นัด</div>

        <div class="flex flex-col">

          <div 
            v-for="(reminder, i) in date_reminder"
            :key="i"
            class="flex flex-row space-x-4 relative"
          >
            <div class="mb-5">
              <div class="text-rangmod-black">ว/ด/ป</div>
              <input 
                type="text" 
                class="w-full text-xl bg-rangmod-gray/50 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="reminder.date"
              >
            </div>

            <div class="mb-5">
              <div class="text-rangmod-black">เวลา</div>
              <input 
                type="text" 
                class="w-full text-xl bg-rangmod-gray/50 border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
                readonly
                :value="reminder.time"
              >
            </div>  

            <div
              class="w-7 h-7 rounded-full absolute -right-16 bottom-6"
              :class="reminder.isActive ? 'bg-rangmod-green' : 'bg-rangmod-gray'"
            ></div>

          </div>
        </div>
      </div>

      <div class="flex flex-col justify-start">

          <div class="text-rangmod-black">ชื่อ-นามสกุลช่าง</div>
          <div class="mb-5">
            <input 
              type="text" 
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            >
          </div>

          <div class="text-rangmod-black">เบอร์ติดต่อช่าง</div>
          <div class="mb-5">
            <input 
              type="text" 
              class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
            >
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
      ]

    }
  }
}
</script>

<style>

</style>