<template>
  <div
    class="font-primary bg-white w-4/5 md:w-2/3 lg:w-1/3 mx-auto my-4 p-10 rounded-xl shadow-md"
  >
    <div class="grid grid-cols-1 gap-4">
      <div class="flex flex-row justify-between">
        <div class="text-rangmod-purple text-3xl">กรอกข้อมูล</div>
        <div class="text-rangmod-black text-xl">2/2</div>
      </div>

      <hr class="my-4" />

      <div class="mb-4">
        <div class="text-rangmod-black px-1">ชื่อ</div>
        <div class="border border-rangmod-gray rounded-xl px-3" :class="this.validate.fname ? 'border-rangmod-red border' : ''">
          <input v-model="fname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="this.validate.fname ? 'placeholder-rangmod-red text-sm' : ''"
            :placeholder="this.validate.fname ? 'กรุณาใส่ชื่อ' : ''"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">นามสกุล</div>
        <div class="border border-rangmod-gray rounded-xl px-3" :class="this.validate.lname ? 'border-rangmod-red border' : ''">
          <input v-model="lname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="this.validate.lname ? 'placeholder-rangmod-red text-sm' : ''"
            :placeholder="this.validate.lname ? 'กรุณาใส่นามสกุล' : ''"
          />
        </div>
      </div>

      <div class="mb-4 grid se:grid-cols-2 grid-cols-1 gap-2">
        <div class="text-rangmod-black px-1">
          วันเกิด
          <div class="border border-rangmod-gray rounded-xl px-3" :class="this.validate.dob ? 'border-rangmod-red border' : ''">
            <input v-model="dob"
              type="date"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="this.validate.dob ? 'placeholder-rangmod-red' : ''"
              :placeholder="this.validate.dob ? 'กรุณาใส่วันเกิด' : ''"
            />
          </div>
        </div>

        <div class="text-rangmod-black px-1">
          อายุ
          <div class="border border-rangmod-gray bg-rangmod-light-gray rounded-xl px-3">
            <input v-model="age" min="1"
              type="number"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="mb-4 grid se:grid-cols-2 gap-2 grid-cols-1">
        <div class="text-rangmod-black px-1">
              เพศ
              <div>
                <select
                  v-model="sex"
                  class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider cursor-pointer"
                >
                  <option disabled value="">เลือกเพศ</option>
                  <option value="M">ชาย</option>
                  <option value="F">หญิง</option>
                </select>
              </div>
            </div>

        <div class="text-rangmod-black px-1">
          เบอร์มือถือ
          <div class="border border-rangmod-gray rounded-xl px-3" :class="this.validate.phone ? 'border-rangmod-red border' : ''">
            <input v-model="phone"
              maxlength="10"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="this.validate.phone ? 'placeholder-rangmod-red text-sm' : ''"
              :placeholder="this.validate.phone ? 'กรุณาใส่เบอร์โทรศัพท์' : ''"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">ที่อยู่</div>
        <div class="border border-rangmod-gray rounded-xl px-3" :class="this.validate.address ? 'border-rangmod-red border' : ''">
          <textarea v-model="address"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="this.validate.address ? 'placeholder-rangmod-red text-sm' : ''"
            :placeholder="this.validate.address ? 'กรุณาใส่ที่อยู่' : ''"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-row space-x-4 justify-center">
        <RouterLink to="/register">
          <div
            class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            กลับ
          </div>
        </RouterLink>

        <!-- <RouterLink :to="`/register/form?type=${type}`"> -->
          <div
            v-on:click="checkRole()"
            class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            ยืนยัน
          </div>
        <!-- </RouterLink> -->
      </div>
    </div>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-80'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>

    <transition>
      <div
        v-show="showModal"
        class="fixed w-full h-fit z-90 inset-0 pb-20 pt-10"
      >
        <div
          class="w-11/12 lg:w-1/3 h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div @click="showModal = false" class="cursor-pointer">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div class="text-2xl text-rangmod-purple mb-5 text-center">
            กรุณากรอกรหัสยืนยันตัวตน OTP ที่ส่งไปยังอีเมล
            nopphasorn.pin@mail.kmutt.ac.th
          </div>
          <div class="flex flex-row space-x-0 justify-center">
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
            <div class="rounded-xl px-3 w-1/12">
              <input maxlength="1"
                type="text"
                class="w-full border-2 border-rangmod-yellow text-rangmod-black bg-rangmod-light-yellow rounded-xl outline-none leading-10 tracking-wider text-center"
              />
            </div>
          </div>

          <div class="flex flex-row space-x-4 justify-center">
            <div
              v-on:click="delete 'delete'"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  // props: ["type"],
  data() {
    return {
      role: this.$route.params.role,
      email: this.$route.params.email,
      password: this.$route.params.password,
      fname: '',
      lname: '',
      sex: '',
      dob: '',
      // age: 1,
      phone: '',
      address: '',
      showModal: false,
      validate: {
        fname: false,
        lname: false,
        sex: false,
        dob: false,
        phone: false,
        address: false,
      }
    };
  },
  computed: {
    age() {
      return this.calculateAge(this.dob)
    }
  },
  mounted() {
    // console.log(this.email)
    // console.log(this.password)
    // console.log(this.role)
  },
  methods: {
    validation() {
      this.fname == "" ? this.validate.fname = true : this.validate.fname = false
      this.lname == "" ? this.validate.lname = true : this.validate.lname = false
      this.sex == "" ? this.validate.sex = true : this.validate.sex = false
      this.dob == "" ? this.validate.dob = true : this.validate.dob = false
      this.phone == "" ? this.validate.phone = true : this.validate.phone = false
      this.address == "" ? this.validate.address = true : this.validate.address = false
      setTimeout(() => {
        this.validate.fname = false;
        this.validate.lname = false;
        this.validate.sex = false;
        this.validate.dob = false;
        this.validate.phone = false;
        this.validate.address = false;
          }, 3000);
      return this.validate.fname && this.validate.lname && this.validate.sex && this.validate.dob && this.validate.phone &&   this.validate.address
    },
    checkRole() {
      this.registerCustomer()
    },
    async registerCustomer() {
      if(!this.validation()) {
      const res = await fetch(`https://dev.rungmod.com/api/registerCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: this.email,
          Password: this.password,
          Fname: this.fname,
          Lname: this.lname,
          Sex: this.sex,
          DateOfBirth: this.dob,
          Age: this.age,
          Phone: this.phone,
          Address: this.address,
        })
      }
      )
      const data = res.json()
      return data
      .then(async (res) => {
        res = await data
        if(res == 'this email can not use!!!') {
          alert('อีเมลนี้ใช้ไม่ได้!!!')
        } else {
          alert("ลงทะเบียนสำเร็จ!");
          this.$router.push(`/login`);
        }
      })
    }
    },
    calculateAge(dob) {
      let currentDate = new Date();
      let birthDate = new Date(dob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference/31557600000);
      console.log(age)
      return age
    }
  }
};
</script>

<style></style>
