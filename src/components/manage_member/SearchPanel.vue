<template>
  
  <div class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2">

    <div class="text-xl">ค้นหาข้อมูลผู้พัก</div>

    <hr class="my-4 border-rangmod-purple">

    <div class="flex flex-row space-x-4 justify-center my-6">

      <div class="flex flex-row space-x-2 items-center">
        <div class="text-md">ชื่อ</div>
        <div>
          <input 
            type="text" 
            class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          >
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <div class="text-md">นามสกุล</div>
        <div>
          <input 
            type="text" 
            class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          >
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <div class="text-md">วันลงทะเบียน</div>
        <div>
          <input 
            type="text" 
            class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          >
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <div class="text-md">ห้อง</div>
        <div>
          <input 
            type="text" 
            class="w-full text-xl border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          >
        </div>
      </div>

    </div>

    <div class="w-32 mx-auto my-10 cursor-pointer" @click="search()">
      <div class="flex flex-row space-x-2 justify-center items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div>ค้นหา</div>
      </div>
    </div>

  </div>

</template>

<script>
export default {

  data() {
    return {

    }
  },

  methods: {

    search() {
      console.log("Search!")
    }
  }

}
</script>

<style>

</style>