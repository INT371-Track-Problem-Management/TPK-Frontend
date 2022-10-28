<template>
  <div class="px-6">
    <div class="bg-white max-w-md mx-auto mt-4 px-10 py-6 rounded-xl shadow-md">
      <div class="text-rangmod-black text-2xl">เข้าสู่ระบบ</div>
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
            :placeholder="this.validate.email ? 'กรุณาใส่อีเมล' : ''"
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

      <div class="mt-10">
        <div @click="doLogin()">
          <div
            class="w-full my-4 py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            เข้าสู่ระบบ
          </div>
        </div>

        <RouterLink to="/register">
          <div
            class="w-full my-4 py-2 rounded-full text-center text-rangmod-purple border-2 border-rangmod-purple transition-all hover:bg-rangmod-purple hover:text-white"
          >
            สมัครสมาชิก
          </div>
        </RouterLink>

        <div
          class="my-4 py-2 text-center text-rangmod-purple/70 transition-all"
        >
          <RouterLink to="/forget" class="hover:font-bold">
            ลืมรหัสผ่าน ?
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textPassword: "password",
      // type: "member",
      email: "",
      password: "",
      token: "",
      userLogin: {
        id: "",
        email: "",
        role: "",
        status: "",
      },
      validate: {
        email: false,
        password: false,
      },
    };
  },
  mounted() {
    if(localStorage.getItem("token")) {
      this.goToPage(localStorage.getItem("role"))
    }
    console.log(process.env.VUE_APP_API_URL);
  },
  methods: {
    validation() {
      this.email == ""
        ? (this.validate.email = true)
        : (this.validate.email = false);
      this.password == ""
        ? (this.validate.password = true)
        : (this.validate.password = false);
    },

    async doLogin() {
      if (!this.validation()) {
        fetch(`${process.env.VUE_APP_API_URL}/login`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => {
            const res = response.json();
            return res;
          })
          .then((res) => {
            this.token = res.token;
            this.userLogin.id = this.parseJwt(this.token).id;
            this.userLogin.email = this.parseJwt(this.token).email;
            this.userLogin.role = this.parseJwt(this.token).role;
            this.userLogin.status = this.parseJwt(this.token).status;
            localStorage.setItem("id", this.userLogin.id);
            localStorage.setItem("email", this.userLogin.email);
            localStorage.setItem("role", this.userLogin.role);
            localStorage.setItem("token", this.token);
            localStorage.setItem("username", res.name);
            console.log(this.userLogin);
          })
          .then(() => {
            if (this.userLogin.status == true) {
              this.goToPage(this.userLogin.role);
            } else {
              console.log("failed login");
            }
          });
      }
    },
    goToPage(userRole) {
      if (userRole == "A") {
        this.$router.push(`/dashboard/member`);
      }

      if (userRole == "E") {
        this.$router.push(`/dashboard/member`);
      }

      if (userRole == "C") {
        this.$router.push(`/member/myroom`);
      }
    },
    parseJwt(token) {
      var base64Url = token.toString().split(".")[1];
      var base64 = base64Url?.replace("-", "+")?.replace("_", "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style></style>
