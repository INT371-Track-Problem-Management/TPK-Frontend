<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">โปรไฟล์</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="max-w-md mx-auto">
      <div class="flex flex-col">
        <div
          class="w-32 h-32 rounded-full bg-rangmod-light-gray mx-auto my-2"
        ></div>
        <div class="mx-auto my-2">รหัสผู้ใช้งาน : {{ this.id }}</div>
      </div>
      <div class="mb-4">
        <div class="text-rangmod-black px-1">ชื่อ</div>
        <div
          class="border border-rangmod-gray rounded-xl px-3"
          :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
        >
          <input
            v-model="userProfile.fname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
            :readonly="!isEditForm"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">นามสกุล</div>
        <div
          class="border border-rangmod-gray rounded-xl px-3"
          :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
        >
          <input
            v-model="userProfile.lname"
            type="text"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
            :readonly="!isEditForm"
          />
        </div>
      </div>

      <div class="xse:mb-4 mb-0 xse:grid xse:grid-cols-2 xse:gap-2">
        <div class="text-rangmod-black px-1 xse:mb-0 mb-4">
          วันเกิด
          <div
            class="border border-rangmod-gray rounded-xl px-3"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
          >
            <input v-if="!isEditForm"
              v-model="userProfile.dateOfBirth"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
              :readonly="!isEditForm"
            />
            <input v-else
              v-model="userProfile.dateOfBirth"
              type="date"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
            />
          </div>
        </div>
        

        <div class="text-rangmod-black px-1 xse:mb-0 mb-4">
          อายุ
          <div
            class="border border-rangmod-gray rounded-xl px-3"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
          >
            <input v-if="!isEditForm"
              v-model="userProfile.age"
              min="1"
              type="number"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
              :readonly="!isEditForm"
            />
            <input v-else
              v-model="age"
              min="1"
              type="number"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
              :readonly="!isEditForm"
            />
          </div>
        </div>
      </div>

      <div class="xse:mb-4 mb-0 xse:grid xse:grid-cols-2 xse:gap-2">
        <div class="text-rangmod-black px-1 xse:mb-0 mb-4">
          เพศ
          <div
            class="border border-rangmod-gray rounded-xl px-3"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
          >
            <input
              v-model="userProfile.sex"
              type="text"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
              :readonly="!isEditForm"
            />
          </div>
        </div>

        <div class="text-rangmod-black px-1 xse:mb-0 mb-4">
          เบอร์มือถือ
          <div
            class="border border-rangmod-gray rounded-xl px-3"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
          >
            <input
              v-model="userProfile.phone"
              type="text"
              maxlength="10"
              class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
              :readonly="!isEditForm"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black px-1">ที่อยู่</div>
        <div
          class="border border-rangmod-gray rounded-xl px-3"
          :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
        >
          <textarea
            v-model="userProfile.address"
            class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
            :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
            :readonly="!isEditForm"
          ></textarea>
        </div>
      </div>

      <div v-show="!isEditForm" class="flex flex-col">
        <div
          @click="showChangePwdModal = !showChangePwdModal"
          class="cursor-pointer mx-auto my-2 text-lg text-rangmod-light-blue"
        >
          เปลี่ยนรหัสผ่าน
        </div>
        <div
          @click="isEditForm = !isEditForm"
          class="cursor-pointer w-32 md:w-40 mx-auto my-2 py-2 text-lg rounded-full text-center text-black border-2 border-white bg-rangmod-light-yellow shadow-sm transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
        >
          แก้ไขโปรไฟล์
        </div>
      </div>
      <div v-show="isEditForm" class="flex flex-row">
        <div
          @click="cancel()"
          class="cursor-pointer w-32 xse:w-40 mx-auto my-2 py-2 text-lg rounded-full text-center text-rangmod-red border-2 border-rangmod-red bg-white shadow-sm transition-all hover:bg-transparent hover:border-rangmod-red hover:text-white hover:shadow-none hover:bg-rangmod-red"
        >
          ยกเลิก
        </div>
        <div
          @click="editProfile()"
          class="cursor-pointer w-32 xse:w-40 mx-auto my-2 py-2 text-lg rounded-full text-center text-black border-2 border-white bg-rangmod-light-yellow shadow-sm transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
        >
          บันทึก
        </div>
      </div>
    </div>
    <div
      :class="
        showChangePwdModal
          ? 'bg-black fixed inset-0 opacity-60 visible z-[80]'
          : 'hidden opacity-0'
      "
      @click="showChangePwdModal = false"
    ></div>
    <transition name="bounce">
      <div
        v-show="showChangePwdModal"
        class="fixed w-full h-fit z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div
              @click="(showChangePwdModal = false), clearPasswordData()"
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
          <div class="text-2xl text-rangmod-purple mb-5">เปลี่ยนรหัสผ่าน</div>
          <div class="mb-4">
            <div class="flex flex-row">
              <div class="text-rangmod-black px-1">รหัสผ่านเก่า</div>
              <div v-show="changePwdModal.ivlOldPassword" class="text-rangmod-red px-1"> * กรุณาใส่รหัสผ่านเก่า</div>
            </div>
            
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="changePwdModal.oldPassword"
                :type="textPasswordOld"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
              <div
                @click="
                  textPasswordOld == 'password'
                    ? (textPasswordOld = 'text')
                    : (textPasswordOld = 'password')
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
              <div class="text-rangmod-black px-1">รหัสผ่านใหม่</div>
              <div v-show="changePwdModal.ivlNewPassword" class="text-rangmod-red px-1"> * กรุณาใส่รหัสผ่านใหม่</div>
            </div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="changePwdModal.newPassword"
                :type="textPasswordNew"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
              <div
                @click="
                  textPasswordNew == 'password'
                    ? (textPasswordNew = 'text')
                    : (textPasswordNew = 'password')
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
              <div v-show="changePwdModal.ivlConfirmPassword" class="text-rangmod-red px-1"> * กรุณายืนยันรหัสผ่าน</div>
              <div v-show="changePwdModal.ivlSamePassword" class="text-rangmod-red px-1"> * รหัสผ่านไม่ตรงกัน</div>
            </div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="changePwdModal.confirmPassword"
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

          <div class="flex flex-row space-x-4 justify-end">
            <div
              @click="changePassword()"
              class="w-40 my-4 py-2 text-lg rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm cursor-pointer transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ยืนยัน
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="changedPassword"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 my-auto px-6"
      >
        <div
          class="max-w-fit min-w-[300px] h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            เปลี่ยนรหัสผ่านสำเร็จ
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div
        v-if="editedProfile"
        class="fixed w-full h-fit z-[100] inset-0 pb-20 pt-10 my-auto"
      >
        <div
          class="w-1/6 h-full mx-auto my-10 bg-white border-4 border-rangmod-purple px-3 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="text-2xl text-rangmod-purple my-5 text-center">
            แก้ไขโปรไฟล์สำเร็จ
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
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),
      userProfile: {},
      beforeEdit: {},
      showChangePwdModal: false,
      changePwdModal: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        ivlOldPassword: false,
        ivlNewPassword: false,
        ivlConfirmPassword: false,
        ivlSamePassword: false,
      },
      changedPassword: false,
      editedProfile: false,
      isEditForm: false,
      textPasswordOld: "password",
      textPasswordNew: "password",
      textPasswordConfirm: "password",
    };
  },
  computed: {
    age() {
      return this.calculateAge(this.userProfile.dateOfBirth)
    }
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getUserProfile(this.role);
      this.beforeEdit = structuredClone(this.userProfile)
    },
    async getUserProfile(userRole) {
      const role = userRole == "E" || userRole == "A" ? "employee" : "customer";
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/${role}/FetchProfile/${this.email}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.Profile != null) {
          this.userProfile = data.Profile;
          this.userProfile.sex = data.Profile.sex == "M" ? "ชาย" : "หญิง";
          this.userProfile.dateOfBirth = this.dateShowFormat(data.Profile.dateOfBirth)
        }
      });
    },
    clearPasswordData() {
      this.changePwdModal.oldPassword = "";
      this.changePwdModal.newPassword = "";
      this.changePwdModal.confirmPassword = "";
    },
    cancel() {
      this.userProfile = structuredClone(this.beforeEdit)
      this.isEditForm = !this.isEditForm;
    },
    async changePassword() {
      if (this.checkChangePwd()) {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/service/changePassword`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              Email: this.email,
              OldPassword: this.changePwdModal.oldPassword,
              NewPassword: this.changePwdModal.newPassword,
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          if(data.message == 'success') {
            console.log('เปลี่ยนรหัสผ่านสำเร็จ');
            this.changedPassword = true;
      setTimeout(() => {
        this.changedPassword = false;
      }, 1500)
      setTimeout(() => {
        this.showChangePwdModal = false;
      }, 2500)
          }
        });
      }

    },
    async editProfile() {
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/customer/editProfile/?email=${this.email}`,
          {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              Fname: this.userProfile.fname,
              Lname: this.userProfile.lname,
              Sex: this.userProfile.sex,
              DateOfBirth: this.userProfile.dateOfBirth,
              Age: this.age,
              Phone: this.userProfile.phone,
              Address: this.userProfile.address,
              UpdateBy: parseInt(this.id),
            }),
          }
        );
        const data = res.json();
        return data.then((data) => {
          console.log(data);
        });
      // this.editedProfile = true;
      // setTimeout(() => {
      //   this.editedProfile = false;
      // }, 1500);
      // setTimeout(() => {
      //   this.isEditForm = false;
      // }, 2500);
    },
    checkChangePwd() {
      this.changePwdModal.ivlOldPassword = this.changePwdModal.oldPassword == '' ? true : false
      this.changePwdModal.ivlNewPassword = this.changePwdModal.newPassword == '' ? true : false
      this.changePwdModal.ivlConfirmPassword = this.changePwdModal.confirmPassword == '' ? true : false
      if(this.changePwdModal.ivlOldPassword || this.changePwdModal.ivlNewPassword || this.changePwdModal.ivlConfirmPassword) {
        setTimeout(() => {
          this.changePwdModal.ivlOldPassword = false
          this.changePwdModal.ivlNewPassword = false
          this.changePwdModal.ivlConfirmPassword = false
        }, 3000)
        console.log("false1");
        return false
      } else if(this.changePwdModal.newPassword != this.changePwdModal.confirmPassword) {
        this.changePwdModal.ivlSamePassword = true
        setTimeout(() => {
          this.changePwdModal.ivlSamePassword = false
        }, 3000)
        console.log("false2");
        return false
      } else {
        console.log("true");
        return true
      }
      
    },
    dateShowFormat(inputDate) {
      const date = new Date(inputDate);
      const formatedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return formatedDate;
    },
    calculateAge(dob) {
      let currentDate = new Date();
      let birthDate = new Date(dob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference/31557600000);
      return age
    }
  },
};
</script>

<style>
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
</style>
