<template>
  <div class="px-6">
  <div
    class="font-primary bg-white max-w-md mx-auto mt-4 px-10 py-6 rounded-xl shadow-md"
  >
    <div class="text-rangmod-purple text-2xl">สมัครสมาชิก</div>
    <hr class="my-4" />

    <div class="mb-4">
      <div class="text-rangmod-black px-1">อีเมล์</div>
      <div
        class="border border-rangmod-gray rounded-xl px-3"
        :class="this.validate.email ? 'border-red-500 border-2' : ''"
      >
        <input
          v-model="email"
          type="email"
          class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          :class="this.validate.email ? 'placeholder-red-500' : ''"
          :placeholder="
            this.validate.email ? 'กรุณาใส่อีเมล' : 'example@example.com'
          "
        />
      </div>
    </div>

    <div class="mb-4">
      <div class="text-rangmod-black px-1">รหัสผ่าน</div>
      <div
        class="border border-rangmod-gray rounded-xl px-3 relative"
        :class="this.validate.password ? 'border-red-500 border-2' : ''"
      >
        <input
          v-model="password"
          :type="textPassword"
          class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          :class="this.validate.password ? 'placeholder-red-500' : ''"
          :placeholder="this.validate.password ? 'กรุณาใส่รหัสผ่าน' : ''"
        />

        <div
          @click="
            textPassword == 'password'
              ? (textPassword = 'text')
              : (textPassword = 'password')
          "
          class="absolute right-4 top-2 text-rangmod-gray cursor-pointer"
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
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex flex-row">
        <div class="text-rangmod-black px-1">ยืนยันรหัสผ่าน</div>
        <div v-if="this.validate.confirmPassword" class="text-rangmod-red px-1 font-bold">X รหัสผ่านไม่ตรงกัน</div>
      </div>
      
      <div
        class="border border-rangmod-gray rounded-xl px-3 relative"
        :class="this.validate.confirmPassword ? 'border-red-500 border-2' : ''"
      >
        <input
          v-model="confirmPassword"
          :type="textPasswordConfirm"
          class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          :class="this.validate.confirmPassword ? 'placeholder-red-500' : ''"
          :placeholder="
            this.validate.confirmPassword ? 'กรุณายืนยันรหัสผ่านให้ถูกต้อง' : ''
          "
        />
        <div
          @click="
            textPasswordConfirm == 'password'
              ? (textPasswordConfirm = 'text')
              : (textPasswordConfirm = 'password')
          "
          class="absolute right-4 top-2 text-rangmod-gray cursor-pointer"
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
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="my-10">
      <!-- <RouterLink :to="{ path:'/register/select', params:{ email: this.email, password}}"> -->
      <div
        @click="register()"
        class="cursor-pointer w-full my-4 py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
      >
        สมัครสมาชิก
      </div>
      <!-- </RouterLink> -->

      <RouterLink to="/login">
        <div
          class="w-full my-4 py-2 rounded-full text-center text-rangmod-purple border-2 border-rangmod-purple transition-all hover:bg-rangmod-purple hover:text-white"
        >
          เข้าสู่ระบบ
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
      textPassword: "password",
      textPasswordConfirm: "password",
      email: "",
      password: "",
      confirmPassword: "",
      validate: {
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  methods: {
    validation() {
      this.email == ""
        ? (this.validate.email = true)
        : (this.validate.email = false);
      this.password == ""
        ? (this.validate.password = true)
        : (this.validate.password = false);
      this.confirmPassword == ""
        ? (this.validate.confirmPassword = true)
        : (this.validate.confirmPassword = false);
      return (
        this.validate.email &&
        this.validate.password &&
        this.validate.confirmPassword
      );
    },

    register() {
      if (!this.validation()) {
          this.$router.push({ name: "register-form", params: { email: this.email, password: this.password },
        });
      }
    },
  },
};
</script>

<style></style>
