<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">โปรไฟล์</div>
    <hr class="my-4 border-rangmod-purple" />

    <div class="max-w-md min-w-[250px] mx-auto">
      <div class="flex flex-col">
        <div
          class="w-32 h-32 rounded-full mx-auto my-2 flex justify-end items-end relative"
        >
          <div
            v-if="preview"
            class="bg-rangmod-light-gray rounded-full w-full h-full absolute flex flex-col justify-center"
          >
            <img
              v-if="preview"
              :src="preview"
              class="rounded-full w-full h-full"
            />
          </div>
          <div
            v-else
            class="bg-rangmod-light-gray rounded-full w-full h-full absolute flex flex-col justify-center"
          >
            <img
              v-if="profileMedia"
              :src="profileMedia"
              class="rounded-full w-full h-full"
            />
          </div>
          <svg
            @click="editProfileMedia()"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit-3 text-rangmod-gray hover:stroke-[3] cursor-pointer"
          >
            <path d="M12 20h9"></path>
            <path
              d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
            ></path>
          </svg>
          <input
            id="uploadImage"
            type="file"
            @change="handleFileUpload($event)"
            hidden
          />
          <div v-if="editProfileImage" class="absolute -right-7">
            <svg
              @click="cancelChangeProfileMedia()"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="bi bi-save text-rangmod-light-red hover:stroke-[1.5] cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div v-if="editProfileImage" class="absolute -right-14">
            <svg
              @click="uploadImage(file)"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="bi bi-check text-rangmod-green hover:stroke-[1.5] cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
              />
            </svg>
          </div>
        </div>
        <div class="mx-auto my-2">รหัสผู้ใช้งาน : {{ this.id }}</div>
      </div>
      <div class="mb-4">
        <div class="text-rangmod-black ml-1">ชื่อ</div>
        <div
          v-if="!isEditForm"
          class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
        >
          {{ userProfile.fname }}
        </div>
        <input
          v-else
          v-model="userProfile.fname"
          type="text"
          class="w-full px-3 border border-rangmod-gray text-rangmod-black bg-white rounded-xl outline-none leading-10 tracking-wider"
        />
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black ml-1">นามสกุล</div>
        <div
          v-if="!isEditForm"
          class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
        >
          {{ userProfile.lname }}
        </div>
        <input
          v-else
          v-model="userProfile.lname"
          type="text"
          class="w-full px-3 border border-rangmod-gray text-rangmod-black bg-white rounded-xl outline-none leading-10 tracking-wider"
        />
      </div>

      <div class="mb-4 flex flex-row space-x-2">
        <div class="text-rangmod-black w-full">
          <div class="text-rangmod-black ml-1">วันเกิด</div>
          <div
            v-if="!isEditForm"
            class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
          >
            {{ userProfile.date }}
          </div>
          <input
            v-else
            v-model="userProfile.dateOfBirth"
            type="date"
            class="w-full px-3 border border-rangmod-gray text-rangmod-black bg-white rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>

        <div class="text-rangmod-black w-full">
          <div class="text-rangmod-black ml-1">อายุ</div>
          <div
            v-if="!isEditForm"
            class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
          >
            {{ userProfile.age }}
          </div>
          <input
            v-else
            v-model="age"
            min="1"
            type="number"
            class="w-full px-3 border border-rangmod-gray text-rangmod-black bg-white rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>
      </div>

      <div class="mb-4 flex flex-row space-x-2">
        <div class="text-rangmod-black w-full">
          <div class="text-rangmod-black ml-1">เพศ</div>
          <div
            v-if="!isEditForm"
            class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
          >
            {{ filterGender(userProfile.sex) }}
          </div>
          <div v-else class="relative">
            <div
              @click="openGender = !openGender"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider flex flex-row justify-between cursor-pointer items-center"
            >
              <div v-if="userProfile.sex != ''" class="cursor-pointer">
                <div v-if="userProfile.sex.sexEN">
                  {{ filterGender(userProfile.sex.sexEN) }}
                </div>
                <div v-else>
                  {{ filterGender(userProfile.sex) }}
                </div>
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
                  @click="(userProfile.sex = sex), (openGender = false)"
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

        <div class="text-rangmod-black w-full">
          <div class="text-rangmod-black ml-1">เบอร์มือถือ</div>

          <div
            v-if="!isEditForm"
            class="w-full border px-3 border-rangmod-gray text-rangmod-black bg-rangmod-light-gray rounded-xl outline-none leading-10 tracking-wider"
          >
            {{ userProfile.phone }}
          </div>
          <input
            v-else
            v-model="userProfile.phone"
            type="text"
            maxlength="10"
            class="w-full px-3 border border-rangmod-gray text-rangmod-black bg-white rounded-xl outline-none leading-10 tracking-wider"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="text-rangmod-black ml-1">ที่อยู่</div>
        <textarea
          v-model="userProfile.address"
          class="w-full border border-rangmod-gray rounded-xl px-3 text-rangmod-black outline-none leading-10 tracking-wider"
          :class="isEditForm ? 'bg-white' : 'bg-rangmod-light-gray'"
          :readonly="!isEditForm"
        ></textarea>
      </div>

      <div v-show="!isEditForm" class="flex flex-col">
        <div
          @click="isEditForm = !isEditForm"
          class="cursor-pointer w-32 md:w-40 mx-auto my-2 py-2 text-lg rounded-full text-center text-black border-2 border-white bg-rangmod-light-yellow shadow-sm transition-all hover:bg-transparent hover:border-rangmod-light-yellow hover:text-rangmod-light-yellow hover:shadow-none"
        >
          แก้ไขโปรไฟล์
        </div>
        <div
          @click="
            (showChangePwdModal = !showChangePwdModal), (modalbg = !modalbg)
          "
          class="cursor-pointer mx-auto my-2 text-lg text-rangmod-light-blue"
        >
          เปลี่ยนรหัสผ่าน
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
      v-if="modalbg"
      class="bg-black fixed inset-0 opacity-60 visible z-[70]"
    ></div>
    <transition name="bounce">
      <div
        v-show="showChangePwdModal"
        class="fixed w-full h-fit z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || changedPassword"
          class="bg-black fixed inset-0 opacity-60 visible z-[90]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <!-- Closed -->
          <div class="flex justify-end">
            <div
              @click="
                (showChangePwdModal = false),
                  (modalbg = false),
                  clearPasswordData()
              "
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
              <div
                v-show="changePwdModal.ivlOldPassword"
                class="text-rangmod-red px-1"
              >
                * กรุณาใส่รหัสผ่านเก่า
              </div>
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
              <div
                v-show="changePwdModal.ivlNewPassword"
                class="text-rangmod-red px-1"
              >
                * กรุณาใส่รหัสผ่านใหม่
              </div>
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
              <div
                v-show="changePwdModal.ivlConfirmPassword"
                class="text-rangmod-red px-1"
              >
                * กรุณายืนยันรหัสผ่าน
              </div>
              <div
                v-show="changePwdModal.ivlSamePassword"
                class="text-rangmod-red px-1"
              >
                * รหัสผ่านไม่ตรงกัน
              </div>
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
          v-if="changedPassword"
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
      modalbg: false,
      loading: false,
      openGender: false,
      filteredRole:
        localStorage.getItem("role") == "E" ||
        localStorage.getItem("role") == "A"
          ? "employee"
          : "customer",
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
      userProfile: {},
      beforeEdit: {},
      file: "",
      preview: "",
      profileMedia: "",
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
      return this.calculateAge(this.userProfile.dateOfBirth);
    },
    editProfileImage() {
      return this.preview != "";
    },
  },
  mounted() {
    this.create();
  },
  methods: {
    async create() {
      await this.getUserProfile();
      console.log(this.userProfile);
      this.beforeEdit = structuredClone(this.userProfile);
      this.userProfile.date = this.splitDate(this.userProfile.dateOfBirth);
      this.beforeEdit.date = this.splitDate(this.beforeEdit.dateOfBirth);
      console.log(this.beforeEdit);
      await this.getProfileMedia();
      console.log(this.preview);
    },
    async getProfileMedia() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/service/profileMedia/${this.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      console.log(res);
      if (res.status == 404) {
        this.profileMedia = "";
      } else {
        const binaryData = await res.arrayBuffer();
        const base64 = this.arrayBufferToBase64(binaryData);
        const dataUrl = `data:image/*;base64,${base64}`;
        this.profileMedia = dataUrl;
        localStorage.setItem("profileMedia", dataUrl);
        console.log(localStorage.getItem("profileMedia"));
      }
    },
    arrayBufferToBase64(buffer) {
      return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    },
    async getUserProfile() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/${this.filteredRole}/viewProfile`,
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
        if (data[this.filteredRole] != null) {
          this.userProfile = data[this.filteredRole];
        }
      });
    },
    clearPasswordData() {
      this.changePwdModal.oldPassword = "";
      this.changePwdModal.newPassword = "";
      this.changePwdModal.confirmPassword = "";
    },
    cancel() {
      this.userProfile = structuredClone(this.beforeEdit);
      this.isEditForm = !this.isEditForm;
    },
    async changePassword() {
      if (this.checkChangePwd()) {
        this.modalbg = false;
        this.loading = true;
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
          console.log(data);
          if (data == "success") {
            this.loading = false;
            this.changedPassword = true;
            setTimeout(() => {
              this.changedPassword = false;
            }, 1500);
            setTimeout(() => {
              this.showChangePwdModal = false;
              this.clearPasswordData();
            }, 2500);
          }
        });
      }
    },
    async editProfile() {
      console.log(this.beforeEdit.dateOfBirth.split("T")[0]);
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/${this.filteredRole}/editProfile/?email=${this.email}`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            fname: this.userProfile.fname,
            lname: this.userProfile.lname,
            sex: this.userProfile.sex.sexEN,
            dateOfBirth:
              this.age < 0
                ? this.beforeEdit.dateOfBirth.split("T")[0]
                : this.userProfile.dateOfBirth.split("T")[0],
            age: this.age < 0 ? this.beforeEdit.age : this.age,
            phone: this.userProfile.phone,
            address: this.userProfile.address,
            updateBy: parseInt(this.id),
          }),
        }
      );
      const data = res.json();
      return data.then((res) => {
        if (res == "success") {
          console.log(res);
        }
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
      this.changePwdModal.ivlOldPassword =
        this.changePwdModal.oldPassword == "" ? true : false;
      this.changePwdModal.ivlNewPassword =
        this.changePwdModal.newPassword == "" ? true : false;
      this.changePwdModal.ivlConfirmPassword =
        this.changePwdModal.confirmPassword == "" ? true : false;
      if (
        this.changePwdModal.ivlOldPassword ||
        this.changePwdModal.ivlNewPassword ||
        this.changePwdModal.ivlConfirmPassword
      ) {
        setTimeout(() => {
          this.changePwdModal.ivlOldPassword = false;
          this.changePwdModal.ivlNewPassword = false;
          this.changePwdModal.ivlConfirmPassword = false;
        }, 3000);
        console.log("false1");
        return false;
      } else if (
        this.changePwdModal.newPassword != this.changePwdModal.confirmPassword
      ) {
        this.changePwdModal.ivlSamePassword = true;
        setTimeout(() => {
          this.changePwdModal.ivlSamePassword = false;
        }, 3000);
        console.log("false2");
        return false;
      } else {
        console.log("true");
        return true;
      }
    },
    cancelChangeProfileMedia() {
      this.preview = "";
      this.file = "";
    },
    editProfileMedia() {
      document.getElementById("uploadImage").click();
    },
    handleFileUpload(e) {
      this.file = e.target.files[0];
      console.log(this.file);
      if (this.file) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        console.log(reader);
      }
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(url);
    },
    async uploadImage(file) {
      let formData = new FormData();
      formData.append("image", file);
      let path =
        this.profileMedia == "" ? "uploadProfile" : "profile/update/media";
      let method = this.profileMedia == "" ? "POST" : "PUT";
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/service/${path}/${this.email}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: formData,
        }
      );
      const data = res.json();
      return data.then(async (res) => {
        if (res == "success") {
          this.cancelChangeProfileMedia();
          await this.getProfileMedia();
        }
      });
    },
    splitDate(datetime) {
      if (datetime == "") {
        return "";
      }
      const res = datetime.split("T");
      const dateRes = res[0].split("-");
      const showDate =
        dateRes[2] + "/" + dateRes[1] + "/" + (parseInt(dateRes[0]) + 543);
      return showDate;
    },
    calculateAge(dob) {
      let currentDate = new Date();
      let birthDate = new Date(dob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
    filterGender(sex) {
      for (let i in this.sexes) {
        if (sex == this.sexes[i].sexEN) {
          return this.sexes[i].sexTH;
        }
      }
    },
  },
};
</script>

<style>
/* .bounce-enter-active {
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
} */
</style>
