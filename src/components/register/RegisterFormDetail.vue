<template>
  <div class="bg-white w-full md:w-2/3 lg:w-1/3 mx-4 md:mx-auto my-4 p-10 rounded-xl shadow-md">

    <div class="grid grid-cols-1 gap-4">

      <div class="flex flex-row justify-between">
        <div class="text-rangmod-purple text-3xl">กรอกข้อมูล</div>
        <div class="text-rangmod-black text-xl">2/2</div>
      </div>

      <hr class="my-4">

      <div class="mb-4">
        <div class="text-rangmod-black text-xl px-1">ชื่อ</div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <input 
            type="text" 
            class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
          >
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black text-xl px-1">นามสกุล</div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <input 
            type="text" 
            class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
          >
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-2">
        <div class="text-rangmod-black text-xl px-1">
          ว/ด/ป/เกิด
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input 
              type="text" 
              class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
            >
          </div>
        </div>

        <div class="text-rangmod-black text-xl px-1">
          อายุ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input 
              type="text" 
              class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
            >
          </div>
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-2">
        <div class="text-rangmod-black text-xl px-1">
          เพศ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input 
              type="text" 
              class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
            >
          </div>
        </div>

        <div class="text-rangmod-black text-xl px-1">
          เบอร์มือถือ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input 
              type="text" 
              class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
            >
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black text-xl px-1">ที่อยู่</div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <textarea 
            class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-row space-x-4 justify-center">

        <RouterLink to="/register/select">
          <div class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
            กลับ
          </div>
        </RouterLink>
        
        <RouterLink :to="`/register/form?type=${type}`">
          <div class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
            ยืนยัน
          </div>
        </RouterLink>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  
  props: ["type"],

}
</script>

<style>

</style>