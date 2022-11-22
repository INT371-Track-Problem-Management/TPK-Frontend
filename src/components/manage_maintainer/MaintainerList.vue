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
      @click="(showAddStaff1 = !showAddStaff1), (modalBg = !modalBg)"
    >
      <!-- <div
        class="items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
      >
        <div class="text-center">ลงทะเบียนช่างซ่อม</div>
      </div> -->
    </div>
    <div
      v-if="loading"
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
        <!-- <th class="py-4">&nbsp;</th> -->
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
        <!-- <td
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="
            (showStaffDetail = !showStaffDetail),
              (modalBg = !modalBg),
              showDetail(staff)
          "
        >
          <div>รายละเอียด</div>
        </td> -->
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

        <!-- <div
          class="text-center py-4 text-rangmod-purple cursor-pointer transition-all hover:font-bold"
          @click="getDetail(maintainer.customerId)"
        >
          <div>รายละเอียด</div>
        </div> -->
      </div>
    </div>
   
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
      loading: false,
      noData: false,
      maintainerList: [
        {
          maintainerId: 1,
          fname: "test",
          lname: "test",
          phone: "0804341156",
          // count: 2,
          // avg: 3,
          overview: [
            {
              score: 1,
              des: "get out!!!",
            },
            {
              score: 5,
              des: "Irashaimaseee",
            },
          ],
        },
        {
          maintainerId: 4,
          fname: "01",
          lname: "01",
          phone: "0866262386",
          // count: 6,
          // avg: 2,
          overview: [
            {
              score: 1,
              des: "yae mak",
            },
            {
              score: 1,
              des: "yae mak",
            },
            {
              score: 3,
              des: "po chai",
            },
            {
              score: 3,
              des: "po chai",
            },
            {
              score: 2,
              des: "yae",
            },
            {
              score: 2,
              des: "yae",
            },
          ],
        },
        {
          maintainerId: 5,
          fname: "asd",
          lname: "asd",
          phone: "0123456789",
          // count: 1,
          // avg: 5,
          overview: [
            {
              score: 5,
              des: "Sugoi!!!",
            },
          ],
        },
        {
          maintainerId: 8,
          fname: "asd",
          lname: "tesassdat",
          phone: "0245683215",
          // count: 4,
          // avg: 3.75,
          overview: [
            {
              score: 5,
              des: "dee mak",
            },
            {
              score: 4,
              des: "dee",
            },
            {
              score: 3,
              des: "po chai",
            },
            {
              score: 3,
              des: "po chai",
            },
          ],
        },
      ],
      filteredMaintainer: [],
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
      this.loading = true
      this.maintainerList = await this.getMaintainers();
      this.filteredMaintainer = this.maintainerList;
      if(this.filteredMaintainer) {
        this.loading = false
      }
      console.log(this.filteredMaintainer);
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
        console.log(res);
        return res;
      });
    },
    searchMaintainerList(searchItem) {
      this.filteredMaintainer = this.maintainerList;
      console.log(searchItem);
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
