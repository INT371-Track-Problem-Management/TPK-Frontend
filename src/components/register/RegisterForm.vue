<template>
  <div class="px-6">
    <div
      class="bg-white max-w-md min-w-[320px] mx-auto mt-4 px-5 py-6 rounded-xl shadow-md"
    >
      <div class="text-rangmod-purple text-2xl">สมัครสมาชิก</div>
      <hr class="my-4" />

      <div class="mb-4">
        <div class="flex flex-row">
          <div class="text-rangmod-black px-1">อีเมล</div>
          <div v-if="this.validate.email" class="text-rangmod-red px-1">
            *กรุณาใส่อีเมล
          </div>
        </div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <input
            v-model="email"
            type="email"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="flex flex-row">
          <div class="text-rangmod-black px-1">รหัสผ่าน</div>
          <div v-if="validate.password" class="text-rangmod-red px-1">
            *กรุณาใส่รหัสผ่าน
          </div>
          <div v-else-if="needMoreLetter" class="text-rangmod-red px-1">
            *ต้องการอย่างต่ำ 4 ตัวอักษร
          </div>
        </div>
        <div class="border border-rangmod-gray rounded-xl px-3 relative">
          <input
            v-model="password"
            :type="textPassword"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
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
          <div v-if="validate.confirmPassword" class="text-rangmod-red px-1">
            *กรุณาใส่รหัสผ่านยืนยัน
          </div>
          <div v-else-if="!checkDupPwd()" class="text-rangmod-red px-1">
            *รหัสผ่านไม่ตรงกัน
          </div>
        </div>

        <div class="border border-rangmod-gray rounded-xl px-3 relative">
          <input
            @keyup.enter="register()"
            v-model="confirmPassword"
            :type="textPasswordConfirm"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
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
          class="w-full my-4 py-2 rounded-full text-center text-white border-2 border-rangmod-purple bg-rangmod-purple shadow-md cursor-pointer transition-all hover:border-rangmod-light-purple-2 hover:bg-rangmod-light-purple-2"
        >
          สมัครสมาชิก
        </div>
        <!-- </RouterLink> -->

        <RouterLink to="/login">
          <div
            class="w-full my-4 py-2 rounded-full text-center text-rangmod-purple border-2 border-rangmod-purple hover:bg-rangmod-light-pink transition-all bg-white shadow-md"
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
      needMoreLetter: false,
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
        this.validate.email ||
        this.validate.password ||
        this.validate.confirmPassword
      );
    },
    checkDupPwd() {
      return this.password == this.confirmPassword;
    },
    checkMinLetter() {
      return this.password.length >= 4;
    },
    register() {
      if (this.validation() && !this.checkMinLetter()) {
        this.needMoreLetter = true;
        setTimeout(() => {
          this.needMoreLetter = false;
        }, 3000);
      } else if (
        !this.validation() &&
        this.checkDupPwd() &&
        this.checkMinLetter()
      ) {
        this.$router.push({
          name: "register-form",
          params: { email: this.email, password: this.password },
        });
      } else {
        setTimeout(() => {
          this.validate.email = false;
          this.validate.password = false;
          this.validate.confirmPassword = false;
        }, 3000);
      }
    },
  },
};
</script>

<style></style>
