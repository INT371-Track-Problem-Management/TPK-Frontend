<template>
  <div
    class="bg-white rounded-xl text-rangmod-black font-primary my-10 px-5 shadow-md py-2"
  >
    <div class="text-xl">ค้นหาการรายงานปัญหา</div>

    <hr class="my-4 border-rangmod-purple" />

    <div
      class="flex flex-col md:flex-row md:space-x-2 justify-start my-6 w-fit mx-auto md:mx-0"
    >
      <div class="flex flex-row space-x-2 items-center mb-2">
        <div class="w-2/5 text-right lg:w-max text-md">รหัสรายงาน</div>
        <div>
          <input
            @keyup.enter="search()"
            v-model="searchItem.reportId"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center mb-2">
        <div class="w-2/5 text-right lg:w-max text-md">หัวข้อปัญหา</div>
        <div>
          <input
            @keyup.enter="search()"
            v-model="searchItem.title"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>
      </div>

      <div class="flex flex-row space-x-2 items-center mb-2">
        <div class="w-2/5 text-right lg:w-max text-md">ห้อง</div>
        <div>
          <input
            @keyup.enter="search()"
            v-model="searchItem.roomNum"
            type="text"
            class="w-full border border-rangmod-gray rounded-lg outline-none px-2 leading-8 tracking-wider"
          />
        </div>
      </div>

      <div
        class="w-32 mx-auto mb-2 cursor-pointer items-center flex flex-row"
        @click="search()"
      >
        <div class="w-2/5 text-right lg:w-max text-md">&nbsp;</div>
        <div
          class="flex flex-row space-x-2 justify-center items-center bg-rangmod-light-yellow text-dark-yellow rounded-xl px-5 py-2 transition-all hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div>ค้นหา</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchItem: {
        reportId: "",
        title: "",
        roomNum: "",
      },
    };
  },

  methods: {
    search() {
      this.$parent.searchReportList(this.searchItem);
    },
  },
};
</script>

<style></style>
