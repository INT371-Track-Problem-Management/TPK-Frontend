<template>

  <div class="font-primary bg-white w-4/5 md:w-2/3 lg:w-1/3 mx-auto my-4 p-10 rounded-xl shadow-md">
    <div class="grid grid-cols-1 gap-4">

      <div class="flex flex-row justify-between">
        <div class="text-rangmod-purple text-2xl">สวัสดี !</div>
        <div class="text-rangmod-black text-xl">1/2</div>
      </div>

      <hr class="my-4">

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">

          <div 
            @click="selectRole('owner')"
            class="bg-rangmod-light-yellow rounded-3xl p-10 transition-all hover:shadow-md hover:cursor-pointer"
            :class="role == 'owner' ? 'border-2 border-rangmod-purple' : ''"
          >
            <img src="@/assets/images/unauthorized-person.webp" alt="">
            <div class="mt-8 text-center text-2xl text-rangmod-black ">ผู้ดูแลหอ</div>
          </div>

          <div 
            @click="selectRole('customer')"
            class="bg-rangmod-light-yellow rounded-3xl p-10 transition-all hover:shadow-md hover:cursor-pointer"
            :class="role == 'customer' ? 'border-2 border-rangmod-purple' : ''"
          >
            <img src="@/assets/images/teamwork.webp" alt="">
            <div class="mt-8 text-center text-2xl text-rangmod-black ">ผู้พักอาศัย</div>
          </div>

      </div>

      <div class="text-rangmod-red text-lg inline-flex mx-auto ">
        <input type="checkbox" @click="isConfirm = !isConfirm" class="w-6 h-6" required>
        <span class="ml-2">* กดยอมรับ (เมื่อเลือกแล้ว จะไม่สามารถแก้ไขได้ในภายหลัง)</span>
      </div>

      <div class="flex flex-row space-x-4 justify-center">

        <RouterLink to="/register">
          <div class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
            กลับ
          </div>
        </RouterLink>

        <div @click="checkConfirm" class="cursor-pointer">
          <div class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
            ต่อไป
          </div>
        </div>

      </div>

    </div>    
  </div>

</template>

<script>
export default {
  // props: ["email"],
  data() {
    return {
      role : "",
      isConfirm : false,
      email: this.$route.params.email,
      password: this.$route.params.password
    }
  },
  mounted() {
    console.log(this.email)
    console.log(this.password)
  },
  methods: {
    selectRole(selectRole) {
      this.role = selectRole
    },
    checkConfirm(){
      if(this.role != "" && this.isConfirm) {
        this.$router.push({name:'register-form', params:{ email: this.email, password: this.password, role: this.role}})
      } else {
        alert("กรุณากดเลือกตำแหน่งและกดยอมรับ")
      }
    }
  }
}
</script>

<style>

</style>