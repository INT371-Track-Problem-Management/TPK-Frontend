<template>
  <div class="px-6">
    <div
      class="bg-white max-w-md min-w-[320px] mx-auto mt-4 px-5 py-6 rounded-xl shadow-md"
    >
      <div class="grid grid-cols-1 gap-4">
        <div class="flex flex-row justify-between">
          <div class="text-rangmod-purple text-3xl">กรอกข้อมูล</div>
          <div class="text-rangmod-black text-xl">2/2</div>
        </div>

        <hr class="my-4" />

        <div class="mb-4">
          <div class="flex flex-row">
            <div class="text-rangmod-black ml-1">ชื่อ</div>
            <div v-if="validate.fname" class="text-rangmod-red px-1">
              *กรุณาใส่ชื่อ
            </div>
          </div>
          <input
            v-model="fname"
            type="text"
            class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
          />
        </div>

        <div class="mb-4">
          <div class="flex flex-row">
            <div class="text-rangmod-black ml-1">นามสกุล</div>
            <div v-if="validate.lname" class="text-rangmod-red px-1">
              *กรุณาใส่นามสกุล
            </div>
          </div>
          <input
            v-model="lname"
            type="text"
            class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
          />
        </div>

        <div
          class="mb-4 flex flex-col xse:flex-row xse:space-x-2 space-y-4 xse:space-y-0"
        >
          <div class="w-full">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">วันเกิด</div>
              <div v-if="validate.dob" class="text-rangmod-red px-1">
                *กรุณาใส่วันเกิด
              </div>
              <div v-if="validate.age" class="text-rangmod-red px-1">
                *กรุณาใส่วันเกิดใหม่
              </div>
            </div>
            <input
              v-model="dob"
              type="date"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
          </div>

          <div class="w-full">
            <div class="text-rangmod-black ml-1">อายุ</div>
            <input
              v-model="age"
              min="1"
              type="number"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              readonly
            />
          </div>
        </div>

        <div
          class="mb-4 flex flex-col xse:flex-row xse:space-x-2 space-y-4 xse:space-y-0"
        >
          <div class="text-rangmod-black w-full">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">เพศ</div>
              <div v-if="validate.sex" class="text-rangmod-red px-1">
                *กรุณาใส่เพศ
              </div>
            </div>
            <div class="relative">
              <div
                @click="openGender = !openGender"
                class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider flex flex-row justify-between cursor-pointer items-center"
              >
                <div v-if="sex != ''" class="cursor-pointer">
                  {{ sex.sexTH }}
                </div>
                <div v-else class="cursor-pointer">เลือกเพศ</div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down text-rangmod-purple cursor-pointer"
                  viewBox="0 0 16 16"
                  :class="
                    openGender ? 'transition-all rotate-180' : 'transition-all'
                  "
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
              <div
                class="w-full absolute flex flex-col"
                :class="
                  openGender
                    ? 'py-2 px-4 transition-all max-h-min h-fit border-2 border-rangmod-light-gray shadow-xl rounded-lg bg-white divide-y divide-rangmod-light-gray'
                    : 'max-h-[0vh]'
                "
              >
                <div
                  v-for="(sex, i) in sexes"
                  :key="i"
                  class="w-full flex justify-end"
                  :class="
                    openGender
                      ? ' max-h-min h-fit hover:font-bold cursor-pointer'
                      : 'max-h-[0vh]'
                  "
                >
                  <div
                    @click="(this.sex = sex), (openGender = false)"
                    :class="
                      openGender
                        ? 'transition-all w-full max-h-min h-fit py-2 text-right'
                        : 'opacity-0 max-h-[0vh]'
                    "
                  >
                    {{ sex.sexTH }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">เบอร์มือถือ</div>
              <div v-if="validate.phone" class="text-rangmod-red px-1">
                *กรุณาใส่เบอร์
              </div>
            </div>
            <input
              v-model="phone"
              maxlength="10"
              type="text"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
          </div>
        </div>

        <div class="mb-4">
          <div class="flex flex-row">
            <div class="text-rangmod-black ml-1">ที่อยู่</div>
            <div v-if="validate.address" class="text-rangmod-red px-1">
              *กรุณาใส่ที่อยู่
            </div>
          </div>
          <textarea
            v-model="address"
            class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
          ></textarea>
        </div>

        <div class="flex flex-row space-x-4 justify-center">
          <RouterLink to="/register">
            <div
              class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              กลับ
            </div>
          </RouterLink>

          <div
            v-on:click="registerCustomer()"
            class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            ยืนยัน
          </div>
        </div>
      </div>

      <div
        v-if="loading || registeredCustomer || emailError"
        class="bg-black fixed inset-0 opacity-60 visible z-[100]"
      ></div>
      <div
        v-if="loading"
        class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
      >
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://lottie.host/005cb1c2-8212-403c-a9cb-37255a3a6552/pwMNUwBeCY.json"
          class="w-40 h-40"
        >
        </lottie-player>
      </div>
      <div
        v-if="registeredCustomer"
        class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
      >
        <div class="text-rangmod-green items-center bg-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            class="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            />
          </svg>
        </div>
      </div>
      <div
        v-if="emailError"
        class="fixed w-full h-full inset-0 flex items-center justify-center z-[110]"
      >
        <div
          class="px-20 py-10 bg-white text-rangmod-red rounded-xl text-center"
        >
          อีเมลนี้ถูกใช้งานแล้ว <br /><br />
          กรุณาใส่อีเมลใหม่
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: this.$route.params.role,
      email: this.$route.params.email,
      password: this.$route.params.password,
      fname: "",
      lname: "",
      sex: "",
      dob: "",
      phone: "",
      address: "",
      showModal: false,
      openGender: false,
      loading: false,
      sexes: [
        {
          id: 1,
          sexTH: "ชาย",
          sexEN: "M",
        },
        {
          id: 2,
          sexTH: "หญิง",
          sexEN: "F",
        },
      ],
      validate: {
        fname: false,
        lname: false,
        sex: false,
        dob: false,
        phone: false,
        address: false,
        age: false,
      },
      registeredCustomer: false,
      emailError: false,
    };
  },
  computed: {
    age() {
      return this.calculateAge(this.dob);
    },
  },
  mounted() {
  },
  methods: {
    validation() {
      this.fname == ""
        ? (this.validate.fname = true)
        : (this.validate.fname = false);
      this.lname == ""
        ? (this.validate.lname = true)
        : (this.validate.lname = false);
      this.sex == "" ? (this.validate.sex = true) : (this.validate.sex = false);
      this.dob == "" ? (this.validate.dob = true) : (this.validate.dob = false);
      this.phone == ""
        ? (this.validate.phone = true)
        : (this.validate.phone = false);
      this.address == ""
        ? (this.validate.address = true)
        : (this.validate.address = false);
      this.age < 0 ? (this.validate.age = true) : (this.validate.age = false);
      return (
        this.validate.fname ||
        this.validate.lname ||
        this.validate.sex ||
        this.validate.dob ||
        this.validate.phone ||
        this.validate.address ||
        this.validate.age
      );
    },
    async registerCustomer() {
      if (!this.validation()) {
        this.loading = true;
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/registerCustomer`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              fname: this.fname,
              lname: this.lname,
              sex: this.sex.sexEN,
              dateOfBirth: this.dob,
              age: this.age,
              phone: this.phone,
              address: this.address,
            }),
          }
        );
        const data = res.json();
        return data.then((res) => {
          if (res !== Number) {
            this.loading = false;
            this.registeredCustomer = true;
            setTimeout(() => {
              this.registeredCustomer = false;
            }, 2000);
            setTimeout(() => {
              this.$router.push(`/login`);
            }, 2500);
          } else {
            this.loading = false;
            this.emailError = true;
            setTimeout(() => {
              this.emailError = false;
              this.$router.push(`/register`);
            }, 3000);
          }
        });
      } else {
        setTimeout(() => {
          this.validate.fname = false;
          this.validate.lname = false;
          this.validate.sex = false;
          this.validate.dob = false;
          this.validate.phone = false;
          this.validate.address = false;
          this.validate.age = false;
        }, 3000);
      }
    },
    calculateAge(dob) {
      let currentDate = new Date();
      let birthDate = new Date(dob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },
};
</script>

<style></style>
