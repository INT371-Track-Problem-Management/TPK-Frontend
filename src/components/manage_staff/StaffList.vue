<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลผู้ดูแล</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      class="w-44 my-5 cursor-pointer"
      @click="(showAddStaff1 = !showAddStaff1), (modalBg = !modalBg)"
    >
      <div
        class="items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
      >
        <div class="text-center">ลงทะเบียนพนักงาน</div>
      </div>
    </div>

    <table class="w-full text-rangmod-black mb-10 hidden md:table">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">รหัส</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <!-- <th class="py-4">ว/ด/ป ลงทะเบียน</th> -->
        <th class="py-4">อีเมล</th>
        <th class="py-4">บทบาท</th>
        <th class="py-4"></th>
        <th class="py-4"></th>
      </tr>
      <tr
        v-for="(staff, i) in staffList"
        :key="i"
        class="border-b border-rangmod-light-gray transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4 whitespace-nowrap">{{ i + 1 }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ staff.customerId }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ staff.fname }} {{ staff.lname }}
        </td>
        <!-- <td class="text-center py-4 whitespace-nowrap">{{ staff.date }}</td> -->
        <td class="text-center py-4 whitespace-nowrap">{{ staff.email }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          <div v-for="(status, j) in statusList" :key="j">
            <div v-if="staff.status == status.id" :class="status.color">
              {{ status.title }}
            </div>
          </div>
        </td>
        <td
          class="text-center py-4 text-rangmod-red cursor-pointer transition-all hover:font-bold"
          @click="deleteStaff(staff.employeeId), (modalBg = !modalBg)"
        >
          <div>ลบ</div>
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="(showStaffDetail = !showStaffDetail), (modalBg = !modalBg)"
        >
          <div>รายละเอียด</div>
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(staff, i) in staffList"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between">
          <div>รหัส</div>
          <div>{{ staff.employeeId }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ชื่อ-นามสกุล</div>
          <div>{{ staff.fname }} {{ staff.lname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ว/ด/ป ลงทะเบียน</div>
          <div>{{ staff.date }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ห้อง</div>
          <div>{{ staff.room }}</div>
        </div>

        <div v-for="(status, j) in statusList" :key="j">
          <div
            v-if="staff.status == status.id"
            class="flex flex-row justify-between"
          >
            <div>สถานะ</div>
            <div :class="status.color">{{ status.title }}</div>
          </div>
        </div>

        <div
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="(showStaffDetail = !showStaffDetail), (modalBg = !modalBg)"
        >
          <div>รายละเอียด</div>
        </div>
      </div>
    </div>

    <div
      :class="
        showModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="showModal = !showModal"
    ></div>
    <!-- Add --------------------------------------------------------------------------------------- -->
    <div
      :class="
        modalBg
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      v-on:click="modalBg = !modalBg"
    ></div>

    <transition name="bounce">
      <div
        v-show="showAddStaff1"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="font-primary bg-white w-4/5 md:w-2/3 lg:w-1/3 mx-auto my-4 p-10 rounded-xl shadow-md"
        >
          <div class="flex justify-end">
            <div
              @click="(showAddStaff1 = false), (modalBg = false), clearData()"
              class="cursor-pointer"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="text-rangmod-purple text-2xl">ลงทะเบียนพนักงาน</div>
            <div class="text-rangmod-purple text-xl">1/2</div>
          </div>
          <hr class="my-4" />

          <div class="mb-4">
            <div class="text-rangmod-black px-1">อีเมล์</div>
            <div class="border border-rangmod-gray rounded-xl px-3">
              <input
                v-model="addModal1.email"
                type="email"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">รหัสผ่าน</div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="addModal1.password"
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
            <div class="text-rangmod-black px-1">ยืนยันรหัสผ่าน</div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="addModal1.confirmPassword"
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

          <div class="my-5">
            <div
              @click="nextStep()"
              class="cursor-pointer w-full my-4 py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              สมัครสมาชิก
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="bounce">
      <div
        v-show="showAddStaff2"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="font-primary bg-white w-4/5 md:w-3/4 lg:w-1/3 mx-auto my-4 px-10 pt-10 pb-5 rounded-xl shadow-md"
        >
          <div class="flex justify-end">
            <div
              @click="(showAddStaff2 = false), (modalBg = false), clearData()"
              class="cursor-pointer"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="text-rangmod-purple text-2xl">ทำประวัติ</div>
            <div class="text-rangmod-purple text-xl">2/2</div>
          </div>
          <hr class="my-4" />

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ชื่อ</div>
            <!-- <div class=""> -->
            <input
              v-model="addModal2.fname"
              type="text"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
            <!-- </div> -->
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">นามสกุล</div>
            <!-- <div class=""> -->
            <input
              v-model="addModal2.lname"
              type="text"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
            <!-- </div> -->
          </div>

          <div class="mb-4 grid se:grid-cols-2 grid-cols-1 gap-2">
            <div class="text-rangmod-black px-1">
              วันเกิด
              <!-- <div class=""> -->
              <input
                v-model="addModal2.dob"
                type="date"
                class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
              />
              <!-- </div> -->
            </div>

            <div class="text-rangmod-black px-1">
              อายุ
              <!-- <div
                class="border border-rangmod-gray bg-rangmod-light-gray rounded-xl px-3"
              > -->
              <input
                v-model="age"
                min="1"
                type="number"
                class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider bg-rangmod-light-gray"
                readonly
              />
              <!-- </div> -->
            </div>
          </div>

          <div class="mb-4 grid se:grid-cols-2 gap-2 grid-cols-1">
            <div class="text-rangmod-black px-1">
              เพศ
              <!-- <div class="border border-rangmod-gray rounded-xl px-3"> -->
              <!-- <div
                class="flex flex-row justify-between space-x-4 px-3 mr-3 rounded-xl outline-none leading-10 tracking-wider"
              > -->

              <div>
                <select
                  v-model="addModal2.sex"
                  class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider cursor-pointer"
                >
                  <option disabled value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </select>
              </div>

            </div>

            <div class="text-rangmod-black px-1">
              เบอร์มือถือ
              <!-- <div class=""> -->
              <input
                v-model="addModal2.phone"
                maxlength="10"
                type="text"
                class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
              />
              <!-- </div> -->
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ที่อยู่</div>
            <!-- <div class=""> -->
            <textarea
              v-model="addModal2.address"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            ></textarea>
            <!-- </div> -->
          </div>

          <div class="flex justify-end">
            <div class="flex space-x-4 w-2/3">
              <div
                @click="backStep()"
                class="cursor-pointer w-full py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ย้อนกลับ
              </div>
              <div
                @click="registerStaff()"
                class="cursor-pointer w-full py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="bounce">
      <div
        v-if="registeredStaff"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 my-auto"
      >
        <div
          class="w-1/6 h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            ลงทะเบียนผู้ดูแลสำเร็จ
          </div>
        </div>
      </div>
    </transition>

    <transition name="bounce">
      <div
        v-show="showStaffDetail"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10"
      >
        <div
          class="overflow-auto no-scrollbar h-[600px] font-primary bg-white w-4/5 md:w-3/4 lg:w-1/3 mx-auto my-4 px-10 pt-10 pb-5 rounded-xl shadow-md"
        >
          <div class="flex justify-end">
            <div
              @click="(showStaffDetail = false), (modalBg = false), clearData()"
              class="cursor-pointer"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div class="text-rangmod-purple text-2xl">ประวัติพนักงาน</div>
          <hr class="my-4" />

          <div class="mb-4">
            <div class="text-rangmod-black px-1">รหัสผู้ใช้งาน</div>
            <div
              class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
            >
              <input
                v-model="staffDetailModal.employeeId"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ชื่อ</div>
            <div
              class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
            >
              <input
                v-model="staffDetailModal.fname"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">นามสกุล</div>
            <div
              class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
            >
              <input
                v-model="staffDetailModal.lname"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              />
            </div>
          </div>

          <div class="mb-4 grid se:grid-cols-2 grid-cols-1 gap-2">
            <div class="text-rangmod-black px-1">
              วันเกิด
              <div
                class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
              >
                <input
                  v-model="staffDetailModal.dob"
                  type="text"
                  class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              อายุ
              <div
                class="border border-rangmod-gray bg-rangmod-light-gray rounded-xl px-3"
              >
                <input
                  v-model="staffDetailModal.age"
                  min="1"
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
              <!-- <div class="border border-rangmod-gray rounded-xl px-3"> -->
              <!-- <div
                class="flex flex-row justify-between space-x-4 px-3 mr-3 rounded-xl outline-none leading-10 tracking-wider"
              > -->

              <div
                class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
              >
                <input
                  v-model="staffDetailModal.sex"
                  type="text"
                  class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
                />
              </div>
            </div>

            <div class="text-rangmod-black px-1">
              เบอร์มือถือ
              <div
                class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
              >
                <input
                  v-model="staffDetailModal.phone"
                  maxlength="10"
                  type="text"
                  class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
                />
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">ที่อยู่</div>
            <div
              class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
            >
              <textarea
                v-model="staffDetailModal.address"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              ></textarea>
            </div>
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1">อีเมล</div>
            <div
              class="border border-rangmod-gray rounded-xl px-3 bg-rangmod-light-gray"
            >
              <input
                v-model="staffDetailModal.email"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider bg-rangmod-light-gray"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <div class="w-1/4">
              <div
                @click="showStaffDetail = !showStaffDetail"
                class="cursor-pointer w-full py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      showStaffDetail: false,
      showAddStaff1: false,
      showAddStaff2: false,
      modalBg: false,

      staffDetailModal: {
        employeeId: 1,
        fname: "ธนวินท์",
        lname: "วัตราเศรษฐ์",
        dob: "21/08/2000",
        age: 22,
        sex: "ชาย",
        phone: "0804341156",
        address: "บ้าน",
        email: "thanawin.wnz@gmail.com",
      },
      addModal1: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      addModal2: {
        employeeId: 1,
        fname: "",
        lname: "",
        dob: "",
        // age: 1,
        sex: "",
        phone: "",
        address: "",
      },
      searchCustomer: {},
      statusList: [
        {
          id: "1",
          color: "text-rangmod-green",
          title: "พักอาศัย",
        },
        {
          id: "2",
          color: "text-rangmod-yellow",
          title: "รอเข้าพัก",
        },
        {
          id: "3",
          color: "text-rangmod-red",
          title: "ย้ายออก",
        },
      ],
      staffList: [],
      textPassword: "password",
      textPasswordConfirm: "password",
      registeredStaff: false,
    };
  },
  mounted() {
    this.create();
  },
  computed: {
    age() {
      return this.calculateAge(this.addModal2.dob);
    },
  },
  methods: {
    async create() {
      this.token = localStorage.getItem("token");
      this.staffList = await this.getCustomers();
    },
    async getCustomers() {
      try {
        const res = await fetch(
          "https://dev.rungmod.com/api/employee/customer",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        const data = res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    backStep() {
      this.showAddStaff2 = !this.showAddStaff2;
      setTimeout(() => {
        this.showAddStaff1 = true;
      }, 500);
    },
    nextStep() {
      this.showAddStaff1 = !this.showAddStaff1;
      setTimeout(() => {
        this.showAddStaff2 = true;
      }, 500);
    },
    closeModal(step) {
      if (step == 1) {
        this.showAddStaff1 = false;
      }
      if (step == 2) {
        this.showAddStaff2 = false;
      }
      this.clearData()
    },
    async registerStaff() {
    //   if(!this.validation()) {
    //   const res = await fetch(`https://dev.rungmod.com/api/registerOwner`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       Email: this.addModal1.email,
    //       Password: this.addModal1.password,
    //       Fname: this.addModal2.fname,
    //       Lname: this.addModal2.lname,
    //       Sex: this.addModal2.sex,
    //       DateOfBirth: this.addModal2.dob,
    //       Age: this.age,
    //       Phone: this.addModal2.phone,
    //       Address: this.addModal2.address,
    //     }),
    //   }
    //   )
    //   const data = res.json()
    //   return data
    //   .then(async (res) => {
    //     res = await data
    //     if(res == 'this email can not use!!!') {
    //       alert('อีเมลนี้ใช้ไม่ได้!!!')
    //     } else {
    //       alert("ลงทะเบียนสำเร็จ!");
    //       this.$router.push(`/login`);
    //     }
    //   })
    // }
    this.registeredStaff = true;
      setTimeout(() => {
        this.registeredStaff = false;
      }, 1500)
      setTimeout(() => {
        this.showAddStaff2 = false;
      }, 2500)
      this.modalBg = false
    this.clearData()
    },
    showDetail() {},
    clearData() {
      this.addModal1.email = "";
      this.addModal1.password = "";
      this.addModal1.confirmPassword = "";
      this.addModal2.fname = "";
      this.addModal2.lname = "";
      this.addModal2.dob = "";
      this.age = "";
      this.addModal2.sex = "";
      this.addModal2.phone = "";
      this.addModal2.address = "";
    },
    dateFormat(inputDate) {
      // console.log(inputDate)
      const date = new Date(inputDate);
      // console.log(date.getDate())
      // console.log(date.getMonth())
      // console.log(date.getFullYear())
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return formatedDate;
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

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
select {
  -webkit-appearance: none;
}
</style>
