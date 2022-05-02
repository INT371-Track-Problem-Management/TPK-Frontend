<template>
  <div class="container mx-auto px-5">
    <div class="flex space-x-2 items-center my-5 text-rangmod-purple">

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>

      <div>
        อาพาร์ตเม้นต์
      </div>
    
    </div>

    <div class="text-rangmod-black">อาพาร์ตเม้นต์</div>

    <div 
      class="w-full bg-white"
      :class="apartmentsList.length > 0 ? '' : 'py-48'" 
    >

      <div 
        v-show="apartmentsList.length > 0"
        class="flex justify-end px-12"
      >
        <RouterLink to="/apartments/add" >
          <div 
            class="w-20 bg-rangmod-purple text-white border border-rangmod-purple rounded-full text-center py-1 shadow-md transition-all hover:bg-transparent hover:text-rangmod-purple"
          >
            + เพิ่ม
          </div>
        </RouterLink>
      </div>

      <div 
        v-if="apartmentsList.length > 0"
        class="grid grid-cols-5 gap-5 my-5 px-12 py-2"
      > 

        <div 
          v-for="(ap, i) in apartmentsList"
          :key="i"
        >
          <RouterLink :to="ap.url">
            <div class="w-full rounded-xl py-2 transition-all hover:font-bold hover:opacity-90">
              <div class="aspect-square bg-rangmod-pink rounded-xl mx-2">
                <img :src="ap.thumbnail" alt="" class="object-none object-center">
              </div>
              <div class="text-center my-2 text-xl">
                {{ap.name}}
              </div>
            </div>
          </RouterLink>
        </div>
        
      </div> 

      <div 
        v-else
        class="w-1/2 mx-auto text-center justify-center"
      >
        <div class="my-4">ยังไม่มีอาพาร์ตเม้นต์ในระบบ</div>
        <RouterLink to="/apartments/add">
          <div class="w-20 mx-auto bg-rangmod-purple text-white border border-rangmod-purple rounded-full text-center py-1 shadow-md transition-all hover:bg-transparent hover:text-rangmod-purple">
            + เพิ่ม
          </div>
        </RouterLink>
      </div> 

    </div>


  </div>
</template>

<script>
export default {
  
  data() {
    return {
      apartmentsList: [
        // {
        //   index: "1",
        //   name: "1",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "2",
        //   name: "2",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "3",
        //   name: "3",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "4",
        //   name: "4",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "5",
        //   name: "5",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "6",
        //   name: "6",
        //   thumbnail: "",
        //   url: "/",
        // },
        // {
        //   index: "7",
        //   name: "7",
        //   thumbnail: "",
        //   url: "/",
        // },
      ]
    }
  }
}
</script>

<style>

</style>