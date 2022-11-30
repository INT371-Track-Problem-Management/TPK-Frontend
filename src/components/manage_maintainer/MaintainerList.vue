<template>
  <SearchPanel />
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ข้อมูลช่างซ่อม</div>
    <hr class="my-4 border-rangmod-purple" />

    <div
      class="w-44 my-5 cursor-pointer"
      @click="(showAddMaintainer = !showAddMaintainer), (modalbg = !modalbg)"
    >
      <div
        class="items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
      >
        <div class="text-center">ลงทะเบียนช่างซ่อม</div>
      </div>
    </div>
    <div
      v-if="loadingData"
      class="w-full h-full inset-0 flex items-center justify-center z-[110]"
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
    <div v-else-if="noData" class="mx-auto w-full">
      <div class="text-rangmod-black my-10 mx-auto w-fit">ไม่มีผู้พักอาศัย</div>
    </div>
    <table v-else class="w-full text-rangmod-black mb-10 hidden md:table">
      <tr class="bg-rangmod-light-pink">
        <th class="py-4">ลำดับ</th>
        <th class="py-4">รหัส</th>
        <th class="py-4">ชื่อ-นามสกุล</th>
        <th class="py-4">จำนวนครั้งที่ซ่อม</th>
        <th class="py-4">คะแนนเฉลี่ยที่ได้</th>
      </tr>
      <tr
        v-for="(maintainer, i) in filteredMaintainer"
        :key="i"
        class="border-b border-rangmod-light-gray transition-all hover:bg-rangmod-light-pink/60"
      >
        <td class="text-center py-4 whitespace-nowrap">{{ i + 1 }}</td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ maintainer.maintainerId }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ maintainer.fname }} {{ maintainer.lname }}
        </td>
        <td class="text-center py-4 whitespace-nowrap">
          {{ maintainer.total }}
        </td>
        <td
          class="text-center py-4 whitespace-nowrap flex flex-row justify-center space-x-4 items-center"
        >
          <div class="w-8 text-right">{{ maintainer.average }}</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-star-fill text-rangmod-light-yellow"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            ></path>
          </svg>
        </td>
      </tr>
    </table>

    <div class="flex flex-col md:hidden mb-10">
      <div
        v-for="(maintainer, i) in filteredMaintainer"
        :key="i"
        class="w-full rounded-xl shadow-md p-4 mb-4"
      >
        <div class="flex flex-row justify-between font-bold">
          <div>{{ i + 1 }}</div>
        </div>
        <hr class="my-2 border-rangmod-gray" />
        <div class="flex flex-row justify-between">
          <div>รหัส</div>
          <div>{{ maintainer.maintainerId }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>ชื่อ</div>
          <div>{{ maintainer.fname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>นามสกุล</div>
          <div>{{ maintainer.lname }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>จำนวนครั้งที่ซ่อม</div>
          <div>{{ maintainer.total }}</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>คะแนนเฉลี่ยที่ได้</div>
          <div class="flex flex-row space-x-2 items-center">
            <div>
              {{ maintainer.average }}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill text-rangmod-light-yellow"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              ></path>
            </svg>
          </div>
        </div>

      </div>
    </div>
    <div
      v-if="modalbg"
      class="bg-black fixed inset-0 opacity-60 visible z-[80]"
    ></div>
    <transition name="bounce">
      <div
        v-show="showAddMaintainer"
        class="fixed w-full h-screen z-[90] inset-0 pb-20 pt-10 px-6"
      >
        <div
          v-if="loading || addedMaintainer"
          class="bg-black fixed inset-0 opacity-60 visible z-[90]"
        ></div>
        <div
          class="max-w-md min-w-[320px] h-full mx-auto my-10 bg-white px-5 py-8 rounded-xl shadow-xl overflow-y-scroll no-scrollbar"
        >
          <div class="flex justify-end">
            <div
              @click="
                (showAddMaintainer = false), (modalbg = false), clearData()
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
            <div class="text-rangmod-purple text-2xl">ลงทะเบียนช่างซ่อม</div>
          </div>
          <hr class="my-4" />

          <div class="mb-4">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">ชื่อ</div>
              <div v-if="validate.fname" class="text-rangmod-red px-1">
                *กรุณาใส่ชื่อ
              </div>
            </div>
            <div class="border border-rangmod-gray rounded-xl px-3">
              <input
                v-model="addMaintainer.fname"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">นามสกุล</div>
              <div v-if="validate.lname" class="text-rangmod-red px-1">
                *กรุณาใส่นามสกุล
              </div>
            </div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="addMaintainer.lname"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex flex-row">
              <div class="text-rangmod-black ml-1">เบอร์ติดต่อช่าง</div>
              <div v-if="validate.lname" class="text-rangmod-red px-1">
                *กรุณาใส่เบอร์ติดต่อช่าง
              </div>
            </div>
            <div class="border border-rangmod-gray rounded-xl px-3 relative">
              <input
                v-model="addMaintainer.phone"
                type="text"
                class="w-full border-1 border-black text-rangmod-black rounded-xl outline-none leading-10 tracking-wider"
              />
            </div>
          </div>

          <div class="my-5 w-full flex justify-end">
            <div
              @click="addMtn()"
              class="cursor-pointer w-fit my-4 py-2 px-10 rounded-full text-center text-white border-2 bg-rangmod-purple shadow-sm transition-all hover:bg-transparent hover:border-rangmod-purple hover:text-rangmod-purple hover:shadow-none"
            >
              ลงทะเบียน
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
            v-if="addedMaintainer"
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
      </div>
    </transition>
  </div>
</template>

<script>
import SearchPanel from "@/components/manage_maintainer/SearchPanel.vue";
export default {
  components: { SearchPanel },
  data() {
    return {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      empId: localStorage.getItem("id"),
      loading: false,
      loadingData: false,
      noData: false,
      modalbg: false,
      showAddMaintainer: false,
      addedMaintainer: false,
      maintainerList: [],
      addMaintainer: {
        fname: "",
        lname: "",
        phone: "",
      },
      validate: {
        fname: "",
        lname: "",
        phone: "",
      },
      filteredMaintainer: [],
    };
  },
  mounted() {
    this.create();
  },
  computed: {},
  methods: {
    async create() {
      this.loadingData = true;
      this.maintainerList = await this.getMaintainers();
      this.filteredMaintainer = this.maintainerList;
      if (this.filteredMaintainer) {
        this.loadingData = false;
      }
    },
    async getMaintainers() {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL}/employee/dashboard/maintainer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = res.json();
      return data.then((res) => {
        return res;
      });
    },
    validation() {
      this.validate.fname = this.addMaintainer.fname == "";
      this.validate.lname = this.addMaintainer.lname == "";
      this.validate.phone = this.addMaintainer.phone == "";
      return this.validate.fname || this.validate.lname || this.validate.phone;
    },
    async addMtn() {
      if (!this.validation()) {
        this.modalbg = false;
        this.loading = true;
        const res = await fetch(
          `${process.env.VUE_APP_API_URL}/employee/maintainer`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify({
              fname: this.addMaintainer.fname,
              lname: this.addMaintainer.lname,
              phone: this.addMaintainer.phone,
              updateBy: parseInt(this.empId),
            }),
          }
        );
        const data = res.json();
        return data.then((res) => {
          if (res.message == "success") {
            this.loading = false;
            this.addedMaintainer = true;
            setTimeout(() => {
              this.addedMaintainer = false;
            }, 1500);
            setTimeout(async () => {
              this.showAddMaintainer = false;
              this.maintainerList = await this.getMaintainers();
              this.filteredMaintainer = this.maintainerList;
            }, 2500);
          }
          return res;
        });
      } else {
        setTimeout(() => {
          this.validate.fname = false;
          this.validate.lname = false;
          this.validate.phone = false;
        }, 2000);
      }
    },
    searchMaintainerList(searchItem) {
      this.filteredMaintainer = this.maintainerList;
      this.filteredMaintainer = this.filteredMaintainer.filter((maintainer) => {
        return maintainer.fname.includes(searchItem.fname);
      });
      this.filteredMaintainer = this.filteredMaintainer.filter((maintainer) => {
        return maintainer.lname.includes(searchItem.lname);
      });
      this.filteredMaintainer = this.filteredMaintainer.filter((maintainer) => {
        return maintainer.phone.includes(searchItem.phone);
      });
    },
  },
};
</script>

<style></style>
