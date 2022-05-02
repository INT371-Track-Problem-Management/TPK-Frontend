<template>

  <div class="bg-white w-full md:w-2/3 lg:w-1/3 mx-4 md:mx-auto my-4 p-10 rounded-xl shadow-md">

    <div class="text-rangmod-purple text-3xl">สมัครสมาชิก</div>
    <hr class="my-4">

    <div class="mb-4">
      <div class="text-rangmod-black text-xl px-1">อีเมล์</div>
      <div class="border border-rangmod-gray rounded-xl px-3">
        <input 
          type="email" 
          placeholder="example@example.com"
          class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
        >
      </div>
    </div>

    <div class="mb-4">
      <div class="text-rangmod-black text-xl px-1">รหัสผ่าน</div>
      <div class="border border-rangmod-gray rounded-xl px-3 relative">
        <input 
          :type="textPassword" 
          class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
        >

        <div 
          @click="
            textPassword == 'password' ? 
              textPassword = 'text' : 
              textPassword = 'password'
          "
          class="absolute right-4 top-2 text-rangmod-gray cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>

      </div>
    </div>

    <div class="mb-4">
      <div class="text-rangmod-black text-xl px-1">ยืนยันรหัสผ่าน</div>
      <div class="border border-rangmod-gray rounded-xl px-3 relative">
        <input 
          :type="textPasswordConfirm" 
          class="w-full border-1 border-black text-rangmod-black text-xl rounded-xl outline-none leading-10 tracking-wider"
        >
        <div 
          @click="
            textPasswordConfirm == 'password' ? 
              textPasswordConfirm = 'text' : 
              textPasswordConfirm = 'password'
          "
          class="absolute right-4 top-2 text-rangmod-gray cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
      </div>
    </div>

    <div class="my-10">

      <RouterLink to="/register/select">
        <div class="w-full my-4 py-2 text-xl rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none">
          สมัครสมาชิก
        </div>
      </RouterLink>

      <RouterLink to="/login">
        <div class="w-full my-4 py-2 text-xl rounded-full text-center text-rangmod-purple border-2 border-rangmod-purple transition-all hover:bg-rangmod-purple hover:text-white">
          เข้าสู่ระบบ
        </div>
      </RouterLink>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      textPassword : 'password',
      textPasswordConfirm : 'password'
    }
  }
}
</script>

<style>

</style>