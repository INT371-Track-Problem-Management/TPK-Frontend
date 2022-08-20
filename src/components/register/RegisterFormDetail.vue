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
        <div class="border border-rangmod-gray rounded-xl px-3">
          <input v-model="fname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">นามสกุล</div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <input v-model="lname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-2">
        <div class="text-rangmod-black px-1">
          วันเกิด
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input v-model="dob"
              type="date"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            />
          </div>
        </div>

        <div class="text-rangmod-black px-1">
          อายุ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input v-model="age"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            />
          </div>
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-2">
        <div class="text-rangmod-black px-1">
          เพศ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input v-model="sex"
              maxlength="1"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            />
          </div>
        </div>

        <div class="text-rangmod-black px-1">
          เบอร์มือถือ
          <div class="border border-rangmod-gray rounded-xl px-3">
            <input v-model="phone"
              maxlength="10"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">ที่อยู่</div>
        <div class="border border-rangmod-gray rounded-xl px-3">
          <textarea v-model="address"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-row space-x-4 justify-center">
        <RouterLink to="/register/select">
          <div
            class="w-32 md:w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
          >
            กลับ
          </div>
        </RouterLink>

        <!-- <RouterLink :to="`/register/form?type=${type}`"> -->
          <div
            v-on:click="showModal = !showModal && checkRole()"
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
      fname: 'win',
      lname: 'nie',
      sex: 'M',
      dob: '',
      age: '22',
      phone: '0123456789',
      address: 'Hospital',
      showModal: false,
    };
  },
  mounted() {
    console.log(this.email)
    console.log(this.password)
    console.log(this.role)
  },
  methods: {
    checkRole() {
      console.log(this.role)
      console.log(this.email)
      console.log(this.password)
      console.log(this.fname)
      console.log(this.lname)
      console.log(this.sex)
      console.log(this.dob)
      console.log(this.age)
      console.log(this.phone)
      console.log(this.address)
      if(this.role == 'customer') {
        this.registerCustomer()
        console.log(this.role)
      } else if(this.role == 'owner') {
        this.registerOwner()
        console.log(this.role)
      } else {
        alert('error')
      }
    },
    registerCustomer() {
      fetch(`https://dev.rungmod.com/api/registerCustomer`, {
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
        }),
      }).then((res) => {
        console.log(res);
        alert("Register success!");
      });
    },
    registerOwner() {
      fetch(`https://dev.rungmod.com/api/registerOwner`, {
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
          Position: ''
        }),
      }).then((res) => {
        console.log(res);
        alert("Register success!");
      });
    },
  }
};
</script>

<style></style>
