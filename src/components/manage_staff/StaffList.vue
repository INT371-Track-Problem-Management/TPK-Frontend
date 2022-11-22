<template>
  <SearchPanel />
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลผู้ดูแล</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      v-if="this.role == 'A'"
      class="w-44 my-5 cursor-pointer"
      @click="(showAddStaff1 = !showAddStaff1), (modalbg = !modalbg)"
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
        <th class="py-4">อีเมล</th>
        <th class="py-4">&nbsp;</th>
        <th class="py-4">&nbsp;</th>
      </tr>
      <tr
        v-for="(staff, i) in filteredStaff"
        :key="i"
        class="border-b border-rangmod-light-gray transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4 whitespace-nowrap">{{ i + 1 }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ staff.employeeId }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ staff.fname }} {{ staff.lname }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">{{ staff.email }}</td>
        <td
          v-if="this.role == 'A'"
          class="text-center py-4 text-rangmod-red cursor-pointer transition-all hover:font-bold"
          @click="
            (showDeleteModal = !showDeleteModal),
              showDelete(staff),
              (modalbg = !modalbg)
          "
        >
          <div>ลบ</div>
        </td>
        <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="
            (showStaffDetail = !showStaffDetail),
              (modalbg = !modalbg),
              showDetail(staff)
          "
        >
          <div>รายละเอียด</div>
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(staff, i) in filteredStaff"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between font-bold">
          <div>{{ i + 1 }}</div>
        </div>
        <hr class="my-2 border-rangmod-gray" />
        <div class="flex flex-row justify-between">
          <div>รหัส</div>
          <div>{{ staff.employeeId }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ชื่อ</div>
          <div>{{ staff.fname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>นามสกุล</div>
          <div>{{ staff.lname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>อีเมล</div>
          <div>{{ staff.email }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>&nbsp;</div>
          <div
            v-if="this.role == 'A'"
            class="text-center pt-4 text-rangmod-red cursor-pointer transition-all hover:font-bold"
            @click="
              (showDeleteModal = !showDeleteModal),
                showDelete(staff),
                (modalbg = !modalbg)
            "
          >
            ลบ
          </div>
        </div>

        <div
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="
            (showStaffDetail = !showStaffDetail),
              (modalbg = !modalbg),
              showDetail(staff)
          "
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
      v-if="modalbg"
      class="bg-black fixed inset-0 opacity-60 visible z-[80]"
    ></div>

    <transition name="bounce">
      <div
        v-show="showAddStaff1"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="(showAddStaff1 = false), (modalbg = false), clearData()"
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
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || registeredStaff"
          class="bg-black fixed inset-0 opacity-60 visible z-[95]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="(showAddStaff2 = false), (modalbg = false), clearData()"
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
            <div class="text-rangmod-black px-1 ml-1">ชื่อ</div>
            <input
              v-model="addModal2.fname"
              type="text"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
          </div>

          <div class="mb-4">
            <div class="text-rangmod-black px-1 ml-1">นามสกุล</div>
            <input
              v-model="addModal2.lname"
              type="text"
              class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
            />
          </div>

          <div
            class="mb-4 flex flex-col xse:flex-row xse:space-x-2 space-y-4 xse:space-y-0"
          >
            <div class="w-full">
              <div class="text-rangmod-black ml-1">วันเกิด</div>
              <input
                v-model="addModal2.DateOfBirth"
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
              <div class="ml-1">เพศ</div>
              <div class="relative">
                <div
                  @click="openGender = !openGender"
                  class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider flex flex-row justify-between cursor-pointer items-center"
                >
                  <div v-if="addModal2.sex != ''" class="cursor-pointer">
                    {{ addModal2.sex.sexTH }}
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
                      openGender
                        ? 'transition-all rotate-180'
                        : 'transition-all'
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
                      @click="(addModal2.sex = sex), (openGender = false)"
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
              <div class="text-rangmod-black ml-1">เบอร์มือถือ</div>
              <input
                v-model="addModal2.phone"
                maxlength="10"
                type="text"
                class="w-full px-3 border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
              />
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
          v-if="registeredStaff"
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
        v-show="showStaffDetail"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="(showStaffDetail = false), (modalbg = false), clearData()"
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
                  v-model="staffDetailModal.dateOfBirth"
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
                @click="
                  (showStaffDetail = !showStaffDetail), (modalbg = !modalbg)
                "
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
        v-show="showDeleteModal"
        class="fixed w-full h-fit z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || deleted"
          class="bg-black fixed inset-0 opacity-60 visible z-[95]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="
                (showDeleteModal = false), (deleteModal = {}), (modalbg = false)
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

          <div class="flex flex-row justify-between">
            <div class="text-rangmod-purple text-2xl">
              ต้องการลบผู้ดูแลใช่หรือไม่
            </div>
          </div>
          <hr class="my-4" />

          <div class="flex flex-row space-x-2">
            <div class="mb-4 w-full">
              <div class="text-rangmod-black px-1 ml-1">ชื่อ</div>
              <input
                v-model="deleteModal.fname"
                type="text"
                class="w-full px-3 bg-rangmod-light-gray border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
                readonly
              />
            </div>

            <div class="mb-4 w-full">
              <div class="text-rangmod-black px-1 ml-1">นามสกุล</div>
              <input
                v-model="deleteModal.lname"
                type="text"
                class="w-full px-3 bg-rangmod-light-gray border border-rangmod-gray rounded-xl text-rangmod-black outline-none leading-10 tracking-wider"
                readonly
              />
            </div>
          </div>

          <div class="flex justify-end">
            <div class="flex space-x-4 w-2/3">
              <div
                @click="
                  (showDeleteModal = false),
                    (deleteModal = {}),
                    (modalbg = false)
                "
                class="cursor-pointer w-full py-2 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
              >
                ย้อนกลับ
              </div>
              <div
                @click="deleteStaff(deleteModal.employeeId)"
                class="cursor-pointer w-full py-2 rounded-full text-center text-white border-2 bg-rangmod-light-red shadow-sm transition-all hover:bg-transparent hover:border-rangmod-light-red hover:text-rangmod-light-red hover:shadow-none"
              >
                ลบ
              </div>
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
          v-if="deleted"
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
    <div v-if="loading" class="flex justify-center">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://lottie.host/005cb1c2-8212-403c-a9cb-37255a3a6552/pwMNUwBeCY.json"
        class="w-40 h-40"
      >
      </lottie-player>
    </div>
  </div>
</template>

<script>
import SearchPanel from "@/components/manage_staff/SearchPanel.vue";
export default {
  components: { SearchPanel },
  data() {
    return {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      showStaffDetail: false,
      showAddStaff1: false,
      showAddStaff2: false,
      showDeleteModal: false,
      modalbg: false,
      loading: true,
      openGender: false,
      registeredStaff: false,
      deleted: false,
      staffDetailModal: {},
      addModal1: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      addModal2: {
        employeeId: 1,
        fname: "",
        lname: "",
        DateOfBirth: "",
        sex: "",
        phone: "",
        address: "",
      },
      deleteModal: {},
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
      staffList: [],
      filteredStaff: [],
      textPassword: "password",
      textPasswordConfirm: "password",
    };
  },
  mounted() {
    this.create();
  },
  computed: {
    age() {
      return this.calculateAge(this.addModal2.DateOfBirth);
    },
  },
  methods: {
    async create() {
      this.staffList = await this.getStaffs();
      this.filteredStaff = this.staffList;
    },
    async getStaffs() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/listEmployee`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((data) => {
        if (data.employees) {
          this.loading = false;
          return data.employees;
        }
      });
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
      this.clearData();
    },
    async registerStaff() {
      this.loading = true;
      this.modalbg = false;
      const res = await fetch(`${process.env.VUE_APP_API_URL}/registerOwner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.addModal1.email,
          password: this.addModal1.password,
          fname: this.addModal2.fname,
          lname: this.addModal2.lname,
          sex: this.addModal2.sex.sexEN,
          dateOfBirth: this.addModal2.DateOfBirth,
          age: this.age,
          phone: this.addModal2.phone,
          address: this.addModal2.address,
          position: "staff",
        }),
      });
      const data = res.json();
      console.log(data);
      return data.then(async (res) => {
        if (res == "this email can not use!!!") {
          this.loading = false;
          alert("อีเมลนี้ใช้ไม่ได้!!!");
        } else {
          this.loading = false;
          this.registeredStaff = true;
          setTimeout(() => {
            this.registeredStaff = false;
          }, 1500);
          setTimeout(() => {
            this.showAddStaff2 = false;
          }, 2500);
          this.staffList = await this.getStaffs();
          this.clearData();
        }
      });
    },
    showDetail(staff) {
      this.staffDetailModal = staff;
      this.staffDetailModal.dateOfBirth = this.dateShowFormat(
        staff.dateOfBirth
      );
      this.staffDetailModal.sex = staff.sex == "M" ? "ชาย" : "หญิง";
    },
    showDelete(staff) {
      this.deleteModal = staff;
    },
    async deleteStaff(employeeId) {
      this.loading = true
      this.modalbg = false
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/deleteEmployee/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((res) => {
        if(res.message == 'success') {
          this.loading = false;
          this.deleted = true;
          setTimeout(() => {
            this.deleted = false;
          }, 1500);
          setTimeout(async() => {
            this.showDeleteModal = false;
            this.staffList = await this.getStaffs();
            this.filteredStaff = this.staffList;
          }, 2500);
        }
      });
    },
    clearData() {
      this.addModal1.email = "";
      this.addModal1.password = "";
      this.addModal1.confirmPassword = "";
      this.addModal2.fname = "";
      this.addModal2.lname = "";
      this.addModal2.DateOfBirth = "";
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
      // console.log(date.getFullSex())
      const formatedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullSex();
      return formatedDate;
    },
    calculateAge(DateOfBirth) {
      let currentDate = new Date();
      let birthDate = new Date(DateOfBirth);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
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
    searchStaffList(searchItem) {
      this.filteredStaff = this.staffList;
      this.filteredStaff = this.filteredStaff.filter((maintainer) => {
        return maintainer.employeeId
          .toString()
          .includes(searchItem.employeeId.toString());
      });
      this.filteredStaff = this.filteredStaff.filter((maintainer) => {
        return maintainer.fname.includes(searchItem.fname);
      });
      this.filteredStaff = this.filteredStaff.filter((maintainer) => {
        return maintainer.lname.includes(searchItem.lname);
      });
    },
  },
};
</script>

<style></style>
